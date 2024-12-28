import { Router } from "express";
import { AuthController } from "../controllers/auth-controller";

const authRoute = Router();
authRoute.post("/api/register", AuthController.register);

export default authRoute;