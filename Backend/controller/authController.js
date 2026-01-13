const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/user.model');
const { HrSignupSchema } = require("../config/schema");
const { studentRegisterSchema,loginSchema } = require("../config/schema");


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
      token,
      role: user.role,  
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        location: user.location,
        phone: user.phone
      }
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


// Register HR
exports.registerHR = async (req, res) => {
  const { error } = HrSignupSchema.validate(req.body);
  console.log("Validation Error:", error);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    const { name, email, password, contact,companyName, position } = req.body;


    const existingHR = await User.findOne({ email });
    if (existingHR) {
      return res.status(400).json({ message: "Email already exists" });
    }

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
  const { error } = studentRegisterSchema.validate(req.body);
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
    if (existingStudent) {
      return res.status(400).json({ message: "Email already exists!" });
    }

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

    await newStudent.save();

    res.status(201).json({ message: "Student registered successfully." });
  } catch (error) {
    console.error("Register Error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};
