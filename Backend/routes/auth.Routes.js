const express = require('express');
const router = express.Router();
const authRoutes = require('../controller/authController');

//User and Hr Registration and Login
router.post('/user',authRoutes.register);
router.post('/hr', authRoutes.registerHR);
router.post('/login',  authRoutes.login);


module.exports = router;