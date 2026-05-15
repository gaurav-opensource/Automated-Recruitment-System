const express = require("express");
const router = express.Router();
const authenticate = require("../middlewares/auth.middleware");

const {
  createQuestion,
  getQuestionsByJob,
  runQuestion,
  submitQuestion,
} = require("../controllers/question.controller");

// (Optional) middlewares
// const auth = require("../middlewares/auth.middleware");
// const role = require("../middlewares/role.middleware");

// Create a new question (HR)
router.post("/create", authenticate, /* role("hr"), */ createQuestion);

// Get questions by jobId (Student)
router.get("/:jobId", /* auth, */ getQuestionsByJob);

// Submit question code (Student)
router.post("/run", /* auth, role("student"), */ runQuestion);
router.post("/submit", /* auth, role("student"), */ submitQuestion);

module.exports = router;
