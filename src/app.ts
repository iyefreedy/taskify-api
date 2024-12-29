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

export default app;
