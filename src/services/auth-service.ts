import bcrypt from "bcrypt";
import { InvalidRequestError } from "../models/http-error";
import AuthSchema from "../schema/auth-schema";
import { LoginRequest, RegisterRequest } from "../types";
import database from "../core/database";
import { validate } from "../utils/validation";
import { createAccessToken } from "../utils/jwt";
import logger from "../core/logger";

export class AuthService {
  static async register(request: RegisterRequest) {
    const registerRequest = validate(AuthSchema.REGISTER, request);

    const registeredUser = await database.user.findUnique({
      where: {
        email: registerRequest.email,
      },
    });

    if (registeredUser !== null) {
      throw new InvalidRequestError("Email is already registered");
    }

    const hashedPassword = await bcrypt.hash(registerRequest.password, 10);
    const newUser = await database.user.create({
      data: {
        name: registerRequest.name,
        email: registerRequest.email,
        password: hashedPassword,
      },
    });

    const accessToken = await createAccessToken({ sub: newUser.id });

    return { accessToken };
  }

  static async login(request: LoginRequest) {
    const loginRequest = validate(AuthSchema.LOGIN, request);

    const user = await database.user.findUnique({
      where: { email: loginRequest.email },
    });

    logger.info(user);
    if (user === null) {
      throw new InvalidRequestError("Invalid credential");
    }

    const isPasswordMatch = await bcrypt.compare(
      request.password,
      user.password
    );

    if (!isPasswordMatch) {
      throw new InvalidRequestError("Invalid credential");
    }

    const accessToken = await createAccessToken({ sub: user.id });

    return { accessToken };
  }
}
