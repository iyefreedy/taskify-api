import express from "express";
import cors from "cors";
import errorMiddleware from "./middleware/error-middleware";
import authRoute from "./routes/auth-route";
import userRoute from "./routes/user-route";
import todoRoute from "./routes/todo-route";

const app = express();
app.use(express.json());
app.use(cors());

app.use(authRoute);
app.use(userRoute);
app.use(todoRoute);
app.use(errorMiddleware);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((_req, res, _next) => {
  return res.status(404).json({ error: "Resource path not found" });
});

export default app;
