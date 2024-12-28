import { Request, Response, NextFunction } from "express";
import { AuthService } from "../services/auth-service";

export class AuthController {
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await AuthService.register(req.body);
      return res.status(201).json(result);
    } catch (error) {
      return next(error);
    }
  }
}
