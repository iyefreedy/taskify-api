import supertest from "supertest";
import app from "../src/core/app";
import logger from "../src/core/logger";
import database from "../src/core/database";
import bcrypt from "bcrypt";

describe("Authenticate user", () => {
  beforeEach(async () => {
    const hashedPassword = await bcrypt.hash("test12345678", 10);
    await database.user.create({
      data: {
        name: "User Test 3",
        email: "login-test@test.com",
        password: hashedPassword,
      },
    });
  });

  afterEach(async () => {
    await database.user.deleteMany({
      where: {
        email: "login-test@test.com",
      },
    });
  });

  it("should failed due to invalid parameter", async () => {
    const response = await supertest(app).post("/api/login").send({
      email: "invalid_email",
      password: "test",
    });

    logger.info(JSON.stringify(response.body));
    expect(response.status).toBe(400);
    expect(response.body.error).toBeDefined();
  });

  it("should failed due to invalid credential", async () => {
    const response = await supertest(app).post("/api/login").send({
      email: "login-test@test.com",
      password: "password",
    });

    logger.info(JSON.stringify(response.body));
    expect(response.status).toBe(400);
    expect(response.body.error).toBeDefined();
  });

  it("should success authenticate user", async () => {
    const response = await supertest(app).post("/api/login").send({
      email: "login-test@test.com",
      password: "test12345678",
    });

    logger.info(JSON.stringify(response.body));
    expect(response.status).toBe(200);
    expect(response.body.accessToken).toBeDefined();
  });
});
