import { Request, Response, NextFunction } from "express";
import { TodoService } from "../services/todo-service";

export class TodoController {
  static async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await TodoService.findAll(req.user!.id);

      return res.status(200).json(result);
    } catch (error) {
      return next(error);
    }
  }
  static async find(req: Request, res: Response, next: NextFunction) {
    try {
      const todoId = parseInt(req.params.id);
      const result = await TodoService.find(req.user!.id, todoId);

      return res.status(200).json(result);
    } catch (error) {
      return next(error);
    }
  }
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await TodoService.create(req.user!.id, req.body);

      return res.status(201).json(result);
    } catch (error) {
      return next(error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const todoId = parseInt(req.params.id);
      const result = await TodoService.update(req.user!.id, todoId, req.body);

      return res.status(200).json(result);
    } catch (error) {
      return next(error);
    }
  }
  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const todoId = parseInt(req.params.id);
      await TodoService.delete(req.user!.id, todoId);

      return res.status(204).json(null);
    } catch (error) {
      return next(error);
    }
  }
}
