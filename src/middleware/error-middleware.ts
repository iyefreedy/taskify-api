import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { ResponseError } from "../models/response-error";
import { errors } from "jose";
import logging from "../utils/logging";

export default function errorMiddleware(
  err: Error,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
) {
  logging.error(err);
  if (err instanceof ZodError) {
    return res.status(400).json({
      error: err.errors,
    });
  }

  if (err instanceof ResponseError) {
    return res.status(err.status).json({ error: err.message });
  }

  if (err instanceof errors.JWTExpired) {
    return res.status(401).json({
      error: "Session expired",
    });
  }

  if (err instanceof errors.JWTExpired) {
    return res.status(401).json({
      error: "Access token invalid",
    });
  }

  return res.status(500).json({ error: err.message });
}
