import bcrypt from "bcrypt";
import { ResponseError } from "../models/response-error";
import { AuthSchema } from "../schema/auth-schema";
import { LoginRequest, RegisterRequest } from "../types";
import database from "../utils/database";
import { Validation } from "../utils/validation";
import { createAccessToken } from "../utils/jwt";
import logging from "../utils/logging";

export class AuthService {
  static async register(request: RegisterRequest) {
    const registerRequest = Validation.validate(AuthSchema.REGISTER, request);

    const registeredUser = await database.user.findUnique({
      where: {
        email: registerRequest.email,
      },
    });

    if (registeredUser !== null) {
      throw new ResponseError(400, "Email is already registered");
    }

    const hashedPassword = await bcrypt.hash(registerRequest.password, 10);
    const newUser = await database.user.create({
      data: {
        name: registerRequest.name,
        email: registerRequest.email,
        password: hashedPassword,
      },
    });

    const accessToken = createAccessToken({ sub: newUser.id });

    return { accessToken };
  }

  static async login(request: LoginRequest) {
    const loginRequest = Validation.validate(AuthSchema.LOGIN, request);

    const user = await database.user.findUnique({
      where: { email: loginRequest.email },
    });

    logging.info(user);
    if (user === null) {
      throw new ResponseError(400, "Invalid credential");
    }

    const isPasswordMatch = await bcrypt.compare(
      request.password,
      user.password
    );

    if (!isPasswordMatch) {
      throw new ResponseError(400, "Invalid credential");
    }

    const accessToken = createAccessToken({ sub: user.id });

    return { accessToken };
  }
}
