import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { HttpError } from "../models/http-error";
import { errors } from "jose";
import logger from "../core/logger";

export default function errorMiddleware(
  err: Error,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
) {
  logger.error(err);
  if (err instanceof ZodError) {
    return res.status(400).json({
      error: err.errors,
    });
  }

  if (err instanceof HttpError) {
    return res
      .status(err.status)
      .json({ error: err.message, details: err.details });
  }

  if (err instanceof errors.JWTExpired) {
    return res.status(401).json({
      error: "Session expired",
      details: err.code,
    });
  }

  if (
    err instanceof errors.JWTInvalid ||
    err instanceof errors.JWSSignatureVerificationFailed
  ) {
    return res.status(401).json({
      error: "Access token invalid",
      details: err.code,
    });
  }

  return res.status(500).json({ error: err.message, details: err.stack });
}
