import { NextFunction, Request, Response } from "express";

export default class UserController {
  static async me(req: Request, res: Response, next: NextFunction) {
    try {
      const currentUser = req.user!;

      return res.status(200).json(currentUser);
    } catch (error) {
      return next(error);
    }
  }
}
