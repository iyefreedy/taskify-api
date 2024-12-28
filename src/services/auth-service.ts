import { ResponseError } from "../models/response-error";
import { AuthSchema } from "../schema/auth-schema";
import { RegisterRequest } from "../types";
import database from "../utils/database";
import { Validation } from "../utils/validation";

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

    const newUser = await database.user.create({
      data: {
        name: registerRequest.name,
        email: registerRequest.email,
        password: registerRequest.password,
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return newUser;
  }
}
