const TestcaseResult = require("../models/TestCase.model");
const ApplicationProgress = require("../models/applicationProgress.model");
const Question = require("../models/question.model");
const { runSingleTest } = require("../utils/judge0");

/**
 * Create a new question
 */
exports.createQuestion = async (req, res, next) => {
  try {
    const { jobId, title, description, starterCode, marks, testCases } = req.body;

    const newQuestion = await Question.create({
      jobId,
      title,
      description,
      starterCode,
      marks,
      testCases,
    });

    res.status(201).json(newQuestion);
  } catch (error) {
    next(error);
  }
};

/**
 * Get all questions by jobId (hide hidden test cases)
 */
exports.getQuestionsByJob = async (req, res, next) => {
  try {
    const { jobId } = req.params;

    const questions = await Question.find({ jobId });

    const sanitized = questions.map((q) => {
      const publicTestCases = q.testCases.filter((t) => !t.hidden);

      return {
        _id: q._id,
        jobId: q.jobId,
        title: q.title,
        description: q.description,
        starterCode: q.starterCode,
        marks: q.marks,
        testCases: publicTestCases,
        createdAt: q.createdAt,
      };
    });

    res.json(sanitized);
  } catch (error) {
    next(error);
  }
};

/**
 * Submit code for a question
 */
exports.submitQuestion = async (req, res, next) => {
  try {
    const { userId, jobId, questionId, code, languageId } = req.body;

    if (!userId || !jobId || !questionId || !code || !languageId) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const question = await Question.findById(questionId);
    if (!question) {
      return res.status(404).json({ error: "Question not found" });
    }

    const results = [];
    let passed = 0;

    for (const tc of question.testCases) {
      try {
        const runResult = await runSingleTest(code, languageId, tc.input);

        const actual = (runResult.stdout || "").trim();
        const expected = (tc.output || "").trim();

        const status = actual === expected ? "PASSED" : "FAILED";
        if (status === "PASSED") passed++;

        results.push({
          input: tc.input,
          expectedOutput: expected,
          actualOutput: actual,
          status,
        });
      } catch (err) {
        results.push({
          input: tc.input,
          expectedOutput: tc.output,
          actualOutput: err.message?.substring(0, 200),
          status: "FAILED",
        });
      }
    }

    const score = Math.round(
      (passed / question.testCases.length) * (question.marks || 100)
    );

    await TestcaseResult.create({
      userId,
      jobId,
      questionId,
      results,
      score,
    });

    let progress = await ApplicationProgress.findOne({ userId, jobId });

    if (!progress) {
      progress = new ApplicationProgress({
        userId,
        jobId,
        totalScore: 0,
        testCompleted: false,
      });
    }

    const allResults = await TestcaseResult.find({ userId, jobId });
    progress.totalScore = allResults.reduce(
      (sum, r) => sum + (r.score || 0),
      0
    );

    const totalQuestions = await Question.countDocuments({ jobId });
    const answeredQuestions = await TestcaseResult.distinct("questionId", {
      userId,
      jobId,
    }).then((arr) => arr.length);

    progress.testCompleted = answeredQuestions >= totalQuestions;
    await progress.save();

    res.json({
      message: "Submission evaluated successfully",
      questionScore: score,
      totalScore: progress.totalScore,
      testCompleted: progress.testCompleted,
      results,
    });
  } catch (error) {
    next(error);
  }
};
