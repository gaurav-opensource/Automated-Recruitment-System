const mongoose = require("mongoose");

const testCaseResultSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
  questionId: { type: mongoose.Schema.Types.ObjectId, ref: "Question", required: true },
  results: [
    {
      input: String,
      expectedOutput: String,
      actualOutput: String,
      status: {
        type: String,
        enum: ["PASSED", "FAILED"],
        default: "FAILED",
      },
    },
  ],
  score: { type: Number, default: 0 },
}, { timestamps: true });

testCaseResultSchema.index({ userId: 1, jobId: 1, questionId: 1 }, { unique: true });

module.exports = mongoose.model("TestcaseResult", testCaseResultSchema);
