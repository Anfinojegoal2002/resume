const fileschema = require("../Modal/Resume");
const fs = require("fs");
const pdf = require("pdf-parse");
const analyzeResumeATS = require("../Services/openaiService");

exports.resumeupload = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "File not found" });
    }

    // Read uploaded file
    const databuffer = await fs.promises.readFile(req.file.path);

    // Extract PDF text
    const data = await pdf(databuffer);
    const extractedText = data.text || ""; // ✅ This is your variable

    const jobDescription = req.body.jobDescription || "";

    // Analyze using OpenAI - FIXED: use extractedText, not resumetextText
    const feedback = await analyzeResumeATS(
      extractedText, // ✅ Fixed: was "resumetextText" before
      jobDescription
    );

    // Save to MongoDB
    const Resume = new fileschema({
      fileName: req.file.originalname,
      filePath: req.file.path,
      extractedText,
      feedback, // Save ATS feedback
      pages: data.numpages,
    });

    await Resume.save();

    // Optional: delete file after processing
    await fs.promises.unlink(req.file.path);

    res.status(200).json({
      success: true,
      message: "Uploaded successfully",
      resume: Resume,
      feedback,
    });

  } catch (err) {
    console.error("Upload Error:", err);
    res.status(500).json({
      success: false,
      message: "Upload failed",
      error: err.message,
    });
  }
};