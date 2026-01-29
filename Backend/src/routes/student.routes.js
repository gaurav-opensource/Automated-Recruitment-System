const express = require('express');
const router = express.Router();
const studentController = require('../controllers/student.controller');
const authenticate = require('../middlewares/auth.middleware');


// Get Student Profile
router.get('/getProfile',authenticate, studentController.getProfile);

// Update Student Profile
router.put('/updateProfile',authenticate, studentController.updateProfile);

//get student profile by ID (public view)
router.get('/getProfile/:id', studentController.getProfileById);


module.exports= router;


