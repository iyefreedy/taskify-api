import express from "express";
import errorMiddleware from "./middleware/error-middleware";
import authRoute from "./routes/auth-route";

const app = express();
app.use(express.json());

app.use(authRoute);
app.use(errorMiddleware);

export default app;
