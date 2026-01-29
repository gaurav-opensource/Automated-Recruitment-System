const mongoose = require("mongoose");

const studentProfileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

  college: String,
  degree: String,
  branch: String,
  graduationYear: Number,
  skills: [String],
  projects: [{ title: String, description: String, githubLink: String }],
  experience: [{ company: String, role: String, duration: String }],
  certifications: [{ title: String, issuer: String, year: String }],
  socialLinks: {
    linkedin: String,
    github: String,
    portfolio: String,
  },
  resume: String,
  location: String,
}, { timestamps: true });

module.exports = mongoose.model("StudentProfile", studentProfileSchema);
