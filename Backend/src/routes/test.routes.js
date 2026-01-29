const express = require("express");
const router = express.Router();

// Middlewares
const auth = require("../middlewares/auth.middleware");
const role = require("../middlewares/role.middleware"); 

// Controllers
const {
  evaluateJob,
  enableTestSection,
  sendTestEmail,
  submitTest,
} = require("../controllers/test.controller");

/**
 * ===============================
 * TEST / CODING ROUTES
 * ===============================
 */


// Submit Test Attempt
router.post("/submit", auth, submitTest);

// Enable Test Section for a Job
router.put("/enable/:jobId", auth, enableTestSection );

// Evaluate Job Tests
router.post("/evaluate/:jobId", auth, evaluateJob);

// Send Test Invitation Email
router.post("/email/:jobId", auth, sendTestEmail);

module.exports = router;
