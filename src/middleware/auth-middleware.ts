import { NextFunction, Request, Response } from "express";
import { ResponseError } from "../models/response-error";

import database from "../utils/database";
import { verifyAccessToken } from "../utils/jwt";

export default async function authMiddleware(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  try {
    const authHeader = req.header("Authorization");

    if (authHeader === undefined) {
      throw new ResponseError(401, "Authorization header required");
    }

    if (!authHeader.startsWith("Bearer ")) {
      throw new ResponseError(401, "Invalid access token");
    }

    const accessToken = authHeader.slice(7);

    const { payload } = await verifyAccessToken(accessToken);

    const userId = payload.sub;

    if (userId === undefined) {
      throw new ResponseError(401, "Unauthorized");
    }

    const authenticatedUser = await database.user.findFirst({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (authenticatedUser === null) {
      throw new ResponseError(401, "Unauthorized");
    }

    req.user = authenticatedUser;

    return next();
  } catch (error: unknown) {
    return next(error);
  }
}
