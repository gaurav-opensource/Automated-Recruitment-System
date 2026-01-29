// Function to generate coding test email template
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
      <p>Dear <strong>${name} You are Select for ${jobTitle}</strong>,</p>
      <p>${description}</p>
      <p><strong>Test Window:</strong> ${new Date(startTime).toLocaleString()} - ${new Date(endTime).toLocaleString()}</p>
      <p>You can access your test using the link below:</p>
      <p><a href="${testLink}" style="color: #1a73e8; font-weight: bold;">Start Test</a></p>
      <br/>
      <p>Best regards,<br/>The Hiring Team</p>
    `,
  };
};


// Function to generate interview invitation email template
exports.generateInterviewEmailTemplate = ({
  name,
  jobTitle,
  interviewDate,
  interviewTime,
  interviewLink,
  description,
}) => {
  return {
    subject: `Interview Invitation for ${jobTitle}`,
    html: `
      <p>Dear <strong>${name}</strong>,</p>

      <p>Congratulations! You have been shortlisted for the interview round for the position of <strong>${jobTitle}</strong>.</p>

      <p>${description || "Please find the interview details below:"}</p>

      <p>
        <strong>Interview Date:</strong> ${interviewDate}<br/>
        <strong>Interview Time:</strong> ${interviewTime}
      </p>

      <p>You can join the interview using the link below:</p>

      <p>
        <a href="${interviewLink}" 
           style="color: #1a73e8; font-weight: bold;">
           Join Interview
        </a>
      </p>

      <br/>

      <p>We wish you the best of luck!</p>

      <p>
        Best regards,<br/>
        <strong>The Hiring Team</strong>
      </p>
    `,
  };
};

