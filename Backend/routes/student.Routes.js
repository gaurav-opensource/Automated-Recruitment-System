const express = require('express');
const router = express.Router();
const studentController = require('../controller/studentController');
const authenticate = require('../middleware/authMiddleware');




router.get('/getProfile',authenticate, studentController.getProfile);
router.put('/updateProfile',authenticate, studentController.updateProfile);


module.exports= router;


