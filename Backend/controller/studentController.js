const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/user.model');
const { studentRegisterSchema, loginSchema } = require('../config/schema');




exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      profilePhoto: user.profilePhoto,
      college: user.college,
      degree: user.degree,
      branch: user.branch,
      graduationYear: user.graduationYear,
      location: user.location,
      skills: user.skills,
      experience: user.experience,
      projects: user.projects,
      certifications: user.certifications,
      about: user.about,
      socialLinks: user.socialLinks,
      resume: user.resume
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



exports.updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
     console.log("hai , my name is gaurav yadav")
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { name, email, phone, location, about } = req.body;

    if (name !== undefined) user.name = name;
    if (email !== undefined) user.email = email;
    if (phone !== undefined) user.phone = phone;
    if (location !== undefined) user.location = location;
    if (about !== undefined) user.about = about;

    await user.save();

    return res.status(200).json({ message: "Profile updated successfully", user });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


