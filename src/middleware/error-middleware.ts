import { Request, Response } from "express";
import { ZodError } from "zod";
import { ResponseError } from "../models/response-error";
import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";

export default function errorMiddleware(
  err: Error,
  _req: Request,
  res: Response
) {
  if (err instanceof ZodError) {
    return res.status(400).json({
      error: err.errors,
    });
  }

  if (err instanceof ResponseError) {
    return res.status(err.status).json({ error: err.message });
  }

  if (err instanceof JsonWebTokenError) {
    return res.status(401).json({
      error: err.message,
    });
  }

  if (err instanceof TokenExpiredError) {
    return res.status(401).json({
      error: "Session expired",
    });
  }

  return res.status(500).json({ error: err.message });
}
