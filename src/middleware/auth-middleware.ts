import { NextFunction, Request, Response } from "express";
import { ResponseError } from "../models/response-error";
import { verifyAccessToken } from "../utils/jwt";
import database from "../utils/database";

export default async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const authHeader = req.header("Authorization");

    if (authHeader === undefined) {
      throw new ResponseError(401, "Unauthorized");
    }

    const accessToken = authHeader.substring(7);
    const payload = verifyAccessToken(accessToken);

    const userId =
      typeof payload.sub === "function" ? payload.sub() : payload.sub;

    if (userId === undefined) {
      throw new ResponseError(401, "Unauthorized");
    }

    const authenticatedUser = await database.user.findFirst({
      where: { id: userId },
    });

    if (authenticatedUser === null) {
      throw new ResponseError(401, "Unauthorized");
    }

    req.user = authenticatedUser;

    return next();
  } catch (error) {
    return next(error);
  }
}
