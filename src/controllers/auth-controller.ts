import e from "express";
import { AuthService } from "../services/auth-service";

export class AuthController {
  static async register(req: e.Request, res: e.Response, next: e.NextFunction) {
    try {
      const result = await AuthService.register(req.body);
      return res.status(200).json(result);
    } catch (error) {
      return next(error);
    }
  }
}
