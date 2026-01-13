// const Application = require("../models/Application");
const transporter = require("../config/emailConfig")

// Function to send email
exports.generateTestEmailTemplate = ({
  name,
  description,
  jobTitle,
  startTime,
  endTime,
  testLink,
}) => {
  return {
    subject: `Coding Test Invitation for ${jobTitle}`,
    html: `
      <p>Dear <strong>${name}</strong>,</p>
      <p>${description}</p>
      <p><strong>Test Window:</strong> ${new Date(startTime).toLocaleString()} - ${new Date(endTime).toLocaleString()}</p>
      <p>You can access your test using the link below:</p>
      <p><a href="${testLink}" style="color: #1a73e8; font-weight: bold;">Start Test</a></p>
      <br/>
      <p>Best regards,<br/>The Hiring Team</p>
    `,
  };
};
