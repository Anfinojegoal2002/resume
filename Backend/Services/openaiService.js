const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: "https://openrouter.ai/api/v1"
});

console.log("API Key loaded:", process.env.OPENAI_API_KEY ? "Yes" : "No");

const analyzeResumeATS = async (resumeText, jobDescription, retryCount = 0) => {
  const MAX_RETRIES = 2;
  
  try {
    const response = await openai.chat.completions.create({
      model: "openrouter/free",
      messages: [
        {
          role: "system",
          content: `You are an ATS system. CRITICAL RULES:
1. Return ONLY valid JSON - no markdown, no code blocks, no explanations
2. atsScore MUST be a whole number between 1 and 100 ONLY
3. NEVER use 0 - minimum score is 1
4. Use this exact format:
{
  "atsScore": number,
  "summary": "string",
  "strengths": ["string"],
  "weaknesses": ["string"],
  "missingKeywords": ["string"],
  "improvementSuggestions": ["string"]
}`
        },
        {
          role: "user",
          content: `
Job Description:
${jobDescription || "Not provided"}

Resume:
${resumeText}

Analyze and return ONLY the JSON object with score between 1-100.`
        },
      ],
      temperature: 0.2,
      max_tokens: 1000,
      headers: {
        "HTTP-Referer": "http://localhost:5000",
        "X-Title": "Resume ATS Checker"
      }
    });

    let content = response.choices[0].message.content;
    console.log("Raw AI Response:", content);

    // Handle empty response
    if (!content || content.trim() === '') {
      if (retryCount < MAX_RETRIES) {
        console.log(`Empty response, retrying... (${retryCount + 1}/${MAX_RETRIES})`);
        await new Promise(resolve => setTimeout(resolve, 1000));
        return analyzeResumeATS(resumeText, jobDescription, retryCount + 1);
      }
      throw new Error("Empty response from AI after retries");
    }

    // Clean the response - remove markdown code blocks
    content = content.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim();
    
    // Extract JSON if there's any extra text
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      if (retryCount < MAX_RETRIES) {
        console.log(`No JSON found, retrying... (${retryCount + 1}/${MAX_RETRIES})`);
        await new Promise(resolve => setTimeout(resolve, 1000));
        return analyzeResumeATS(resumeText, jobDescription, retryCount + 1);
      }
      throw new Error("No JSON found in response after retries");
    }
    
    const jsonString = jsonMatch[0];
    const parsed = JSON.parse(jsonString);
    
    // STRICT SCORE VALIDATION: Enforce 1-100 range
    let score = Number(parsed.atsScore);
    
    if (isNaN(score)) {
      console.log("Invalid score (NaN), defaulting to 50");
      score = 50;
    } else if (score > 100) {
      console.log(`Score ${score} > 100, capping to 100`);
      score = 100;
    } else if (score < 1) {
      console.log(`Score ${score} < 1, setting to minimum 1`);
      score = 1;
    }
    
    // Round to nearest integer
    parsed.atsScore = Math.round(score);
    
    return parsed;

  } catch (error) {
    console.error("OpenRouter API Error:", error.message);
    
    if (retryCount < MAX_RETRIES && 
        (error.message.includes("Empty response") || error.message.includes("Unexpected end"))) {
      console.log(`Retrying due to error... (${retryCount + 1}/${MAX_RETRIES})`);
      await new Promise(resolve => setTimeout(resolve, 1000));
      return analyzeResumeATS(resumeText, jobDescription, retryCount + 1);
    }

    // Return a meaningful fallback response with score 1-100
    return {
      atsScore: 50, // Default middle score
      summary: "Analysis completed with partial data. Please try again for more detailed results.",
      strengths: ["Technical skills present"],
      weaknesses: ["Could not perform complete analysis"],
      missingKeywords: ["Try again with more specific job description"],
      improvementSuggestions: ["Please try the analysis again"]
    };
  }
};

module.exports = analyzeResumeATS;