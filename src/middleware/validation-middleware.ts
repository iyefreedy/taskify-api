import { NextFunction, Request, Response } from "express";
import { ResponseError } from "../models/response-error";

export const getResourceId = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    const resourceId = req.params.id;
    if (!resourceId) {
      throw new ResponseError(400, "Resource id is required");
    }

    return next();
  } catch (error) {
    return next(error);
  }
};
