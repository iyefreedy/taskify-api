import { NextFunction, Request, Response } from 'express';
import { InvalidRequestError } from '../models/http-error';

export const getResourceId = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    const resourceId = req.params.id;
    if (!resourceId) {
      throw new InvalidRequestError('Resource id is required');
    }

    return next();
  } catch (error) {
    return next(error);
  }
};
