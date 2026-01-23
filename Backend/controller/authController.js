const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/user.model');
const { studentRegisterSchema, loginSchema, HrSignupSchema } = require("../config/schema");


// Login for both Student and HR
exports.login = async (req, res) => {
  const { error } = loginSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.role }, 
      process.env.JWT_SECRET,
      { expiresIn: "12h" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      role: user.role,
      userId: user._id,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


// Register HR 
exports.registerHR = async (req, res) => {
  // Validate request body
  const { error } = HrSignupSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    const { name, email, password, contact,companyName, position } = req.body;
    const existingHR = await User.findOne({ email });

    // Check if HR with the same email already exists
    if (existingHR) {
      return res.status(400).json({ message: "Email already exists" });
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const hr = new User({
      name,
      email,
      password: hashedPassword,
      contact,
      companyName,
      position,
      role: "hr",
    });

    await hr.save();

    return res.status(200).json({ message: "HR registered successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


// Register Student
exports.register = async (req, res) => {
  // Validate request body
  const { error } = studentRegisterSchema.validate(req.body);

  // If validation fails, return error
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  try {
    const {
      name,
      email,
      password,
      profilePhoto,
      phone,
      college,
      degree,
      branch,
      graduationYear,
      skills,
      projects,
      experience,
      certifications,
      about,
      socialLinks,
      resume,
      location
    } = req.body;

    const existingStudent = await User.findOne({ email });

    // Check if student with the same email already exists
    if (existingStudent) {
      return res.status(400).json({ message: "Email already exists!" });
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newStudent = new User({
      role: "student",
      name,
      email,
      password: hashedPassword,
      profilePhoto,
      phone,
      college,
      degree,
      branch,
      graduationYear,
      skills,
      projects,
      experience,
      certifications,
      about,
      socialLinks,
      resume,
      location
    });
    // Save the new student to the database
    await newStudent.save();

    res.status(201).json({ message: " Student registered successfully" });
  } catch (error) {
    console.error("Register Error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};
