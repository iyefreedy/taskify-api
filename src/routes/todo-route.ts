import { Router } from "express";
import authMiddleware from "../middleware/auth-middleware";
import { TodoController } from "../controllers/todo-controller";
import { getResourceId } from "../middleware/validation-middleware";

const todoRoute = Router();
todoRoute
  .get("/api/todos", authMiddleware, TodoController.findAll)
  .post("/api/todos", authMiddleware, TodoController.create)
  .get("/api/todos/:id", authMiddleware, getResourceId, TodoController.find)
  .put("/api/todos/:id", authMiddleware, getResourceId, TodoController.update)
  .patch("/api/todos/:id", authMiddleware, getResourceId, TodoController.update)
  .delete(
    "/api/todos/:id",
    authMiddleware,
    getResourceId,
    TodoController.delete
  );

export default todoRoute;
