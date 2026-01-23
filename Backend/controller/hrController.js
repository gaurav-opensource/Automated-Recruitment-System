const User = require("../model/user.model");
const Job = require('../model/job.model');


//Get Hr Profile
exports.getHRProfile = async (req, res) => {
  try {
    const hr = await User.findById(req.user.userId);

    // If HR not found
    if (!hr) {
      return res.status(404).json({ message: "HR is not found" });
    }
    // Return HR profile data
    return res.status(200).json({
      id: hr._id,
      name: hr.name,
      email: hr.email,
      contact: hr.contact,
      position: hr.position
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


//Update Hr Profile
exports.updateHRProfile = async (req, res) => {
  try {
    const hr = await User.findById(req.user.userId);
    // If HR not found
    if (!hr) {
      return res.status(404).json({ message: "HR not found" });
    }

    const fields = ["name", "contact", "position"];
    // Update only provided fields
    fields.forEach((field) => {
      if (req.body[field] !== undefined) {
        hr[field] = req.body[field];
      }
    });
    // Save updated HR profile
    await hr.save();
    return res.status(200).json({ message: "Profile updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


//Hr create a Job
exports.createJob = async(req, res) => {
  try {
    const jobData = req.body;

    // Validate job data
    jobData.postedBy = req.user.userId;

    const job = await Job.create(jobData);
    // Return success response
    res.status(201).json({ success: true, job });
  } catch (error) {
    res.status(500).json({ success: false, message: "Job creation failed", error: error.message });
  }
};


// Get job by Hr id
exports.getJobsByHR = async (req, res) => {
  try {
    // Get HR ID from authenticated user
    const hrId = req.user.userId;

    // Fetch jobs posted by this HR
    const jobs = await Job.find({ postedBy: hrId });

    return res.status(200).json({ jobs });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error", error: err.message });
  }
};
