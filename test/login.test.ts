import supertest from "supertest";
import app from "../src/app";
import logging from "../src/utils/logging";
import database from "../src/utils/database";
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

    logging.info(JSON.stringify(response.body));
    expect(response.status).toBe(400);
    expect(response.body.error).toBeDefined();
  });

  it("should failed due to invalid credential", async () => {
    const response = await supertest(app).post("/api/login").send({
      email: "login-test@test.com",
      password: "password",
    });

    logging.info(JSON.stringify(response.body));
    expect(response.status).toBe(400);
    expect(response.body.error).toBeDefined();
  });

  it("should success authenticate user", async () => {
    const response = await supertest(app).post("/api/login").send({
      email: "login-test@test.com",
      password: "test12345678",
    });

    logging.info(JSON.stringify(response.body));
    expect(response.status).toBe(200);
    expect(response.body.accessToken).toBeDefined();
  });
});
