jest.mock('p-queue');

const request = require("supertest");
const app = require("../src/app"); 

describe("Auth API", () => {

  it("should signup HR successfully", async () => {
    const res = await request(app)
      .post("/api/auth/signup")
      .send({
        name: "Test HR",
        email: "hrtest@gmail.com",
        password: "123456",
        contact: "1234567890",
        companyName: "Test Company",
        position: "HR Manager",
        role: "hr"
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("message", "HR registered successfully");
    expect(res.body).toHaveProperty("userId");
  });

  it("should login user successfully", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "test@gmail.com",
        password: "123456"
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
  });

});