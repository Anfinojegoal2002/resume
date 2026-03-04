const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema(
  {
    fileName: String,
    filePath: String,
    extractedText: {
      type: String,
      required: true,
    },
    feedback: {
      atsScore: Number,
      summary: String,
      strengths: [String],
      weaknesses: [String],
      missingKeywords: [String],
      improvementSuggestions: [String],
    },
    pages: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Resume", resumeSchema);
