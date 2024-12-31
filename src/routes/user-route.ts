import { Router } from "express";
import authMiddleware from "../middleware/auth-middleware";
import { UserController } from "../controllers/user-controller";

const userRoute = Router().get(
  "/api/users/me",
  authMiddleware,
  UserController.me
);

export default userRoute;
