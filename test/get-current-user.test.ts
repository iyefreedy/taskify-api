import app from "../src/app";
import supertest from "supertest";
import database from "../src/utils/database";
import bcrypt from "bcrypt";
import logging from "../src/utils/logging";
import { createAccessToken } from "../src/utils/jwt";

describe("Get current user from request request", () => {
  beforeEach(async () => {
    const hashedPassword = await bcrypt.hash("password", 10);
    await database.user.create({
      data: {
        id: "545f163c-23a5-4174-9855-7f4876c29389",
        email: "current-user@test.com",
        name: "Current User",
        password: hashedPassword,
      },
    });
  });

  afterEach(async () => {
    await database.user.delete({
      where: {
        id: "545f163c-23a5-4174-9855-7f4876c29389",
      },
    });
  });

  it("should failed due to empty authorization header", async () => {
    const response = await supertest(app)
      .get("/api/users/me")

      .send();

    expect(response.status).toBe(401);
  });

  it("should failed due to invalid token", async () => {
    const response = await supertest(app)
      .get("/api/users/me")
      .set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1NDVmMTYzYy0yM2E1LTQxNzQtOTg1NS03ZjQ4NzZjMjkzODkiLCJpYXQiOjE3MzUzNjk2NTYsImV4cCI6MTczNTM3Njg1NiwiaXNzIjoidGFza2lmeSJ9.m2HP0EAppaU6bnJCRZzMY--cDA2MHFKX5plZVPrWx3"
      )
      .send();

    expect(response.status).toBe(401);
  });

  it("should success to get current user information", async () => {
    const accessToken = await createAccessToken({
      sub: "545f163c-23a5-4174-9855-7f4876c29389",
    });
    const response = await supertest(app)
      .get("/api/users/me")
      .set("Authorization", `Bearer ${accessToken}`)
      .send();

    logging.info(JSON.stringify(response.body));
    expect(response.status).toBe(200);
    expect(response.body.id).toBe("545f163c-23a5-4174-9855-7f4876c29389");
    expect(response.body.email).toBe("current-user@test.com");
    expect(response.body.name).toBe("Current User");
  });
});
