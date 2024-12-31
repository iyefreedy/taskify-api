import { Router } from "express";
import authMiddleware from "../middleware/auth-middleware";
import { TodoController } from "../controllers/todo-controller";
import { getResourceId } from "../middleware/validation-middleware";

const todoRoute = Router();
todoRoute
  .use(authMiddleware)
  .get("/api/todos", TodoController.findAll)
  .post("/api/todos", TodoController.create)
  .get("/api/todos/:id", getResourceId, TodoController.find)
  .put("/api/todos/:id", getResourceId, TodoController.update)
  .patch("/api/todos/:id", getResourceId, TodoController.update)
  .delete("/api/todos/:id", getResourceId, TodoController.delete);

export default todoRoute;
