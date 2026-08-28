jest.mock('p-queue');

const request = require("supertest");
const app = require("../src/app"); 

describe("Auth API", () => {

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