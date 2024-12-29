import { Router } from "express";
import authMiddleware from "../middleware/auth-middleware";
import { TodoController } from "../controllers/todo-controller";

const todoRoute = Router();
todoRoute.use(authMiddleware).post("/api/todos", TodoController.create);

export default todoRoute;
