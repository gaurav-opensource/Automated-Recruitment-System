const express = require("express");
const router = express.Router();

const {
  createQuestion,
  getQuestionsByJob,
  submitQuestion,
} = require("../controllers/question.controller");

// (Optional) middlewares
// const auth = require("../middlewares/auth.middleware");
// const role = require("../middlewares/role.middleware");

// Create a new question (HR)
router.post("/create", /* auth, role("hr"), */ createQuestion);

// Get questions by jobId (Student)
router.get("/:jobId", /* auth, */ getQuestionsByJob);

// Submit question code (Student)
router.post("/submit", /* auth, role("student"), */ submitQuestion);

module.exports = router;
