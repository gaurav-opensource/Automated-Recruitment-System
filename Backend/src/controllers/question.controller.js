const TestcaseResult = require("../models/TestCase.model");
const ApplicationProgress = require("../models/applicationProgress.model");
const Question = require("../models/question.model");
const { runSingleTest } = require("../utils/judge0");
const jwt = require("jsonwebtoken");

const validateTestAccess = (token, userId, jobId) => {
  if (!token) {
    return { ok: false, status: 403, error: "Test token is required" };
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.TEST_SECRET);
  } catch (err) {
    return { ok: false, status: 403, error: "Invalid or expired test link" };
  }

  if (decoded.jobId !== jobId || decoded.userId !== userId) {
    return { ok: false, status: 403, error: "Invalid test link for this student or job" };
  }

  const now = Date.now();
  const start = new Date(decoded.startTime).getTime();
  const end = new Date(decoded.endTime).getTime();

  if (Number.isNaN(start) || Number.isNaN(end) || now < start || now > end) {
    return { ok: false, status: 403, error: "Test is not open in the current time window" };
  }

  return { ok: true, decoded };
};

/**
 * Create a new question
 */
exports.createQuestion = async (req, res, next) => {
  try {
    const { jobId, title, description, starterCode, marks, testCases } = req.body;

    if (!jobId || !title || !description || !Array.isArray(testCases) || testCases.length === 0) {
      return res.status(400).json({ error: "jobId, title, description, and at least one test case are required" });
    }

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
    const { userId, jobId, questionId, code, languageId, token } = req.body;

    if (!userId || !jobId || !questionId || !code || !languageId) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const access = validateTestAccess(token, userId, jobId);
    if (!access.ok) {
      return res.status(access.status).json({ error: access.error });
    }

    const progress = await ApplicationProgress.findOne({ userId, jobId, currentStage: "coding" });
    if (!progress) {
      return res.status(404).json({ error: "Coding-stage application not found for this test" });
    }

    if (progress.testToken && progress.testToken !== token) {
      return res.status(403).json({ error: "This is not the latest test link for this application" });
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

    const totalCasesForQuestion = question.testCases.length;
    const score = totalCasesForQuestion
      ? Math.round((passed / totalCasesForQuestion) * (question.marks || 100))
      : 0;

    await TestcaseResult.findOneAndUpdate(
      { userId, jobId, questionId },
      { $set: { results, score } },
      { upsert: true, new: true, runValidators: true }
    );

    const allResults = await TestcaseResult.find({ userId, jobId });
    progress.testScore = allResults.reduce(
      (sum, r) => sum + (r.score || 0),
      0
    );
    progress.score = progress.testScore;
    progress.correct = allResults.reduce(
      (sum, r) => sum + (r.results || []).filter((tc) => tc.status === "PASSED").length,
      0
    );
    progress.total = allResults.reduce(
      (sum, r) => sum + (r.results || []).length,
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
      totalScore: progress.testScore,
      testCompleted: progress.testCompleted,
      results,
    });
  } catch (error) {
    next(error);
  }
};

exports.runQuestion = async (req, res, next) => {
  try {
    const { userId, jobId, questionId, code, languageId, token } = req.body;

    if (!userId || !jobId || !questionId || !code || !languageId) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const access = validateTestAccess(token, userId, jobId);
    if (!access.ok) {
      return res.status(access.status).json({ error: access.error });
    }

    const progress = await ApplicationProgress.findOne({ userId, jobId, currentStage: "coding" });
    if (!progress) {
      return res.status(404).json({ error: "Coding-stage application not found for this test" });
    }

    if (progress.testToken && progress.testToken !== token) {
      return res.status(403).json({ error: "This is not the latest test link for this application" });
    }

    const question = await Question.findById(questionId);
    if (!question) {
      return res.status(404).json({ error: "Question not found" });
    }

    const publicTestCases = question.testCases.filter((tc) => !tc.hidden);
    const results = [];

    for (const tc of publicTestCases) {
      try {
        const runResult = await runSingleTest(code, languageId, tc.input);
        const actual = (runResult.stdout || "").trim();
        const expected = (tc.output || "").trim();

        results.push({
          input: tc.input,
          expectedOutput: expected,
          actualOutput: actual || runResult.stderr || runResult.compile_output || "",
          status: actual === expected ? "PASSED" : "FAILED",
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

    res.json({ message: "Code executed successfully", results });
  } catch (error) {
    next(error);
  }
};
