const nodemailer = require("nodemailer");
require("dotenv").config();


// Create a transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  service: "gmail", 
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});


module.exports = { transporter };
