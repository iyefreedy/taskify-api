import { Router } from "express";
import authMiddleware from "../middleware/auth-middleware";
import { UserController } from "../controllers/user-controller";

const userRoute = Router();
userRoute.use(authMiddleware).get("/api/users/me", UserController.me);

export default userRoute;
