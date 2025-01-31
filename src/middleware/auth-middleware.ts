import { NextFunction, Request, Response } from 'express';
import { UnauthorizedError } from '../models/http-error';
import database from '../core/database';
import { verifyAccessToken } from '../utils/jwt';

export default async function authMiddleware(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  try {
    const accessToken = req.cookies['accessToken'];

    if (accessToken === undefined) {
      throw new UnauthorizedError('Session expired');
    }

    const { payload } = await verifyAccessToken(accessToken);

    const userId = payload.sub;

    if (userId === undefined) {
      throw new UnauthorizedError('Unauthorized');
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
      throw new UnauthorizedError('Invalid access token');
    }

    req.user = authenticatedUser;

    return next();
  } catch (error: unknown) {
    return next(error);
  }
}
