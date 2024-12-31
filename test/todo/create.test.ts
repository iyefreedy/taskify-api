import request from "supertest";
import app from "../../src/app";
import { createAccessToken } from "../../src/utils/jwt";
import bcrypt from "bcrypt";
import database from "../../src/utils/database";

describe("POST /api/todos", () => {
  beforeEach(async () => {
    const hashedPassword = await bcrypt.hash("password", 10);
    await database.user.create({
      data: {
        id: "545f163c-23a5-4174-9855-7f4876c29399",
        email: "current-user1@test.com",
        name: "Current User",
        password: hashedPassword,
      },
    });
  });

  afterEach(async () => {
    await database.todo.deleteMany();
    await database.user.delete({
      where: {
        id: "545f163c-23a5-4174-9855-7f4876c29399",
      },
    });
  });

  it("should create a new todo with the related user from the authorization header", async () => {
    const token = createAccessToken({
      sub: "545f163c-23a5-4174-9855-7f4876c29399",
    });

    const newTodo = {
      title: "Test Todo",
      content: "This is a test todo",
    };

    const response = await request(app)
      .post("/api/todos")
      .set("Authorization", `Bearer ${token}`)
      .send(newTodo);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.title).toBe(newTodo.title);
    expect(response.body.content).toBe(newTodo.content);
    expect(response.body).toHaveProperty("userId");
  });

  it("should return 401 if no authorization header is provided", async () => {
    const newTodo = {
      title: "Test Todo",
      description: "This is a test todo",
    };

    const response = await request(app).post("/api/todos").send(newTodo);

    expect(response.status).toBe(401);
  });
});
