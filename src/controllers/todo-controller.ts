import { Request, Response, NextFunction } from "express";
import { TodoService } from "../services/todo-service";

export class TodoController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await TodoService.create(req.user!.id, req.body);

      return res.status(201).json(result);
    } catch (error) {
      return next(error);
    }
  }
}
