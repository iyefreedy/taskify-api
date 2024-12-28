import { z } from "zod";

export class AuthSchema {
  static readonly REGISTER = z.object({
    name: z.string().min(3).max(100),
    email: z.string().email().max(100),
    password: z.string().min(8).max(255),
  });

  static readonly LOGIN = z.object({
    email: z.string().email().max(100),
    password: z.string().min(8).max(255),
  });
}
