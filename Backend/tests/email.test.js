jest.mock("../src/config/email.config.js");
jest.mock("../src/models/applicationProgress.model.js");
jest.mock("../src/models/user.model.js");

const request = require("supertest");
const app = require("../src/app");
const { transporter } = require("../src/config/email.config.js");
const ApplicationProgress = require("../src/models/applicationProgress.model.js");
const User = require("../src/models/user.model.js");

describe("Email API", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Send Test Email - Success Cases", () => {
    it("should send test email successfully to students in coding stage", async () => {
      const mockUser = {
        _id: "userId123",
        name: "John Doe",
        email: "john@example.com",
      };

      const mockApplication = {
        _id: "appId123",
        jobId: "jobId123",
        userId: mockUser,
        currentStage: "coding",
        testToken: null,
        testLink: null,
        save: jest.fn().mockResolvedValue(true),
      };

      ApplicationProgress.find = jest
        .fn()
        .mockReturnValue({
          populate: jest.fn().mockResolvedValue([mockApplication]),
        });

      transporter.sendMail = jest.fn().mockResolvedValue({
        messageId: "test-message-id",
      });

      const res = await request(app)
        .post("/api/email/send-test-email/jobId123")
        .send({
          startTime: new Date(),
          endTime: new Date(Date.now() + 3600000),
          description: "This is a coding test",
          jobTitle: "Software Engineer",
        });

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("message", "Test links sent successfully");
      expect(res.body).toHaveProperty("sent");
      expect(transporter.sendMail).toHaveBeenCalled();
    });

    it("should send email to a specific user when email is provided", async () => {
      const mockUser = {
        _id: "userId123",
        name: "Jane Smith",
        email: "jane@example.com",
      };

      const mockApplication = {
        _id: "appId456",
        jobId: "jobId123",
        userId: mockUser,
        currentStage: "coding",
        testToken: null,
        testLink: null,
        save: jest.fn().mockResolvedValue(true),
      };

      User.findOne = jest.fn().mockResolvedValue(mockUser);

      ApplicationProgress.find = jest
        .fn()
        .mockReturnValue({
          populate: jest.fn().mockResolvedValue([mockApplication]),
        });

      transporter.sendMail = jest.fn().mockResolvedValue({
        messageId: "test-message-id-2",
      });

      const res = await request(app)
        .post("/api/email/send-test-email/jobId123")
        .send({
          email: "jane@example.com",
          startTime: new Date(),
          endTime: new Date(Date.now() + 3600000),
          description: "Coding test for developers",
          jobTitle: "Backend Developer",
        });

      expect(res.statusCode).toBe(200);
      expect(User.findOne).toHaveBeenCalled();
      expect(transporter.sendMail).toHaveBeenCalled();
    });
  });

  describe("Send Test Email - Error Cases", () => {
    it("should return 404 when user is not found", async () => {
      User.findOne = jest.fn().mockResolvedValue(null);

      const res = await request(app)
        .post("/api/email/send-test-email/jobId123")
        .send({
          email: "nonexistent@example.com",
          startTime: new Date(),
          endTime: new Date(Date.now() + 3600000),
          description: "Test email",
          jobTitle: "Test Role",
        });

      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty("message", "User not found");
    });

    it("should return 404 when no students found in coding stage", async () => {
      ApplicationProgress.find = jest
        .fn()
        .mockReturnValue({
          populate: jest.fn().mockResolvedValue([]),
        });

      const res = await request(app)
        .post("/api/email/send-test-email/jobId123")
        .send({
          startTime: new Date(),
          endTime: new Date(Date.now() + 3600000),
          description: "Test email",
          jobTitle: "Test Role",
        });

      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty(
        "message",
        "No students found for this email/job combination in coding stage"
      );
    });

    it("should return 500 when email sending fails - SMTP connection error", async () => {
      const mockUser = {
        _id: "userId123",
        name: "John Doe",
        email: "john@example.com",
      };

      const mockApplication = {
        _id: "appId123",
        jobId: "jobId123",
        userId: mockUser,
        currentStage: "coding",
        testToken: null,
        testLink: null,
        save: jest.fn().mockResolvedValue(true),
      };

      ApplicationProgress.find = jest
        .fn()
        .mockReturnValue({
          populate: jest.fn().mockResolvedValue([mockApplication]),
        });

      // Simulate SMTP connection error
      transporter.sendMail = jest
        .fn()
        .mockRejectedValue(
          new Error("connect ECONNREFUSED: Connection refused")
        );

      const res = await request(app)
        .post("/api/email/send-test-email/jobId123")
        .send({
          startTime: new Date(),
          endTime: new Date(Date.now() + 3600000),
          description: "Test email",
          jobTitle: "Test Role",
        });

      expect(res.statusCode).toBe(500);
      expect(res.body).toHaveProperty("error");
      expect(res.body.error).toContain("Connection refused");
    });

    it("should return 500 when email sending fails - invalid credentials", async () => {
      const mockUser = {
        _id: "userId123",
        name: "John Doe",
        email: "john@example.com",
      };

      const mockApplication = {
        _id: "appId123",
        jobId: "jobId123",
        userId: mockUser,
        currentStage: "coding",
        testToken: null,
        testLink: null,
        save: jest.fn().mockResolvedValue(true),
      };

      ApplicationProgress.find = jest
        .fn()
        .mockReturnValue({
          populate: jest.fn().mockResolvedValue([mockApplication]),
        });

      // Simulate authentication error
      transporter.sendMail = jest
        .fn()
        .mockRejectedValue(new Error("Invalid login credentials"));

      const res = await request(app)
        .post("/api/email/send-test-email/jobId123")
        .send({
          startTime: new Date(),
          endTime: new Date(Date.now() + 3600000),
          description: "Test email",
          jobTitle: "Test Role",
        });

      expect(res.statusCode).toBe(500);
      expect(res.body.error).toContain("Invalid login credentials");
    });

    it("should return 500 when email sending fails - invalid recipient", async () => {
      const mockUser = {
        _id: "userId123",
        name: "John Doe",
        email: "invalid-email", // Invalid email
      };

      const mockApplication = {
        _id: "appId123",
        jobId: "jobId123",
        userId: mockUser,
        currentStage: "coding",
        testToken: null,
        testLink: null,
        save: jest.fn().mockResolvedValue(true),
      };

      ApplicationProgress.find = jest
        .fn()
        .mockReturnValue({
          populate: jest.fn().mockResolvedValue([mockApplication]),
        });

      // Simulate invalid recipient error
      transporter.sendMail = jest
        .fn()
        .mockRejectedValue(new Error("Invalid email format for recipient"));

      const res = await request(app)
        .post("/api/email/send-test-email/jobId123")
        .send({
          startTime: new Date(),
          endTime: new Date(Date.now() + 3600000),
          description: "Test email",
          jobTitle: "Test Role",
        });

      expect(res.statusCode).toBe(500);
      expect(res.body.error).toContain("Invalid email format");
    });

    it("should return 500 when database save operation fails", async () => {
      const mockUser = {
        _id: "userId123",
        name: "John Doe",
        email: "john@example.com",
      };

      const mockApplication = {
        _id: "appId123",
        jobId: "jobId123",
        userId: mockUser,
        currentStage: "coding",
        testToken: null,
        testLink: null,
        save: jest
          .fn()
          .mockRejectedValue(
            new Error("Database connection error")
          ),
      };

      ApplicationProgress.find = jest
        .fn()
        .mockReturnValue({
          populate: jest.fn().mockResolvedValue([mockApplication]),
        });

      const res = await request(app)
        .post("/api/email/send-test-email/jobId123")
        .send({
          startTime: new Date(),
          endTime: new Date(Date.now() + 3600000),
          description: "Test email",
          jobTitle: "Test Role",
        });

      expect(res.statusCode).toBe(500);
      expect(res.body.error).toContain("Database connection error");
    });

    it("should return 500 when JWT signing fails", async () => {
      const mockUser = {
        _id: "userId123",
        name: "John Doe",
        email: "john@example.com",
      };

      const mockApplication = {
        _id: "appId123",
        jobId: "jobId123",
        userId: mockUser,
        currentStage: "coding",
        testToken: null,
        testLink: null,
        save: jest.fn().mockResolvedValue(true),
      };

      ApplicationProgress.find = jest
        .fn()
        .mockReturnValue({
          populate: jest.fn().mockResolvedValue([mockApplication]),
        });

      // Mock process.env.TEST_SECRET to be undefined to cause JWT error
      const originalSecret = process.env.TEST_SECRET;
      delete process.env.TEST_SECRET;

      const res = await request(app)
        .post("/api/email/send-test-email/jobId123")
        .send({
          startTime: new Date(),
          endTime: new Date(Date.now() + 3600000),
          description: "Test email",
          jobTitle: "Test Role",
        });

      expect(res.statusCode).toBe(500);

      // Restore the original value
      process.env.TEST_SECRET = originalSecret;
    });

    it("should return 500 when ApplicationProgress query fails", async () => {
      ApplicationProgress.find = jest
        .fn()
        .mockReturnValue({
          populate: jest
            .fn()
            .mockRejectedValue(new Error("Database query failed")),
        });

      const res = await request(app)
        .post("/api/email/send-test-email/jobId123")
        .send({
          startTime: new Date(),
          endTime: new Date(Date.now() + 3600000),
          description: "Test email",
          jobTitle: "Test Role",
        });

      expect(res.statusCode).toBe(500);
      expect(res.body.error).toContain("Database query failed");
    });
  });

  describe("Email Template Validation", () => {
    it("should validate that email contains correct subject", async () => {
      const mockUser = {
        _id: "userId123",
        name: "John Doe",
        email: "john@example.com",
      };

      const mockApplication = {
        _id: "appId123",
        jobId: "jobId123",
        userId: mockUser,
        currentStage: "coding",
        testToken: null,
        testLink: null,
        save: jest.fn().mockResolvedValue(true),
      };

      ApplicationProgress.find = jest
        .fn()
        .mockReturnValue({
          populate: jest.fn().mockResolvedValue([mockApplication]),
        });

      transporter.sendMail = jest.fn().mockResolvedValue({
        messageId: "test-message-id",
      });

      const jobTitle = "Senior Developer";
      const res = await request(app)
        .post("/api/email/send-test-email/jobId123")
        .send({
          startTime: new Date(),
          endTime: new Date(Date.now() + 3600000),
          description: "Coding test",
          jobTitle,
        });

      expect(res.statusCode).toBe(200);

      // Verify the email was sent with correct subject
      const emailCall = transporter.sendMail.mock.calls[0][0];
      expect(emailCall.subject).toContain(jobTitle);
      expect(emailCall.to).toBe("john@example.com");
      expect(emailCall.html).toContain("john@example.com");
    });
  });
});
