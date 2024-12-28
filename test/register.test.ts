import supertest from "supertest";
import app from "../src/app";
import database from "../src/utils/database";

describe("Create new user test", () => {
  beforeAll(async () => {
    await database.user.create({
      data: {
        name: "User Test",
        email: "test1@example.com",
        password: "password",
      },
    });
  });

  afterAll(async () => {
    await database.user.deleteMany();
  });

  it("should failed due to invalid parameter", async () => {
    const response = await supertest(app).post("/api/register").send({
      email: "invalid_email",
      password: "",
    });

    expect(response.status).toEqual(400);
    expect(response.body.error).toBeDefined();
  });

  it("should failed due to existing email", async () => {
    const response = await supertest(app).post("/api/register").send({
      name: "User Test",
      email: "test1@example.com",
      password: "test",
    });

    expect(response.status).toEqual(400);
    expect(response.body.error).toBeDefined();
  });

  it("should success to create new user", async () => {
    const response = await supertest(app).post("/api/register").send({
      name: "User Test 2",
      email: "test2@example.com",
      password: "test123456",
    });

    expect(response.status).toEqual(201);
    expect(response.body.email).toEqual("test2@example.com");
    expect(response.body.name).toEqual("User Test 2");
  });
});
