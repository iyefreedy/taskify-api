import { Request, Response } from "express";
import { ZodError } from "zod";
import { ResponseError } from "../models/response-error";

export default function errorMiddleware(
  err: Error,
  req: Request,
  res: Response
) {
  if (err instanceof ZodError) {
    return res.status(401).json({
      error: err.errors,
    });
  }

  if (err instanceof ResponseError) {
    return res.status(err.status).json({ error: err.message });
  }

  return res.status(500).json({ error: err.message });
}
