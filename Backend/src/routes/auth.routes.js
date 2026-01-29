const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

// Define routes for authentication

//
router.post("/signup", authController.signup);

// Login
router.post("/login", authController.login);

module.exports = router;