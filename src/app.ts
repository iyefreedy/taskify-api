import express from "express";
import errorMiddleware from "./middleware/error-middleware";
import authRoute from "./routes/auth-route";
import userRoute from "./routes/user-route";

const app = express();
app.use(express.json());

app.use(authRoute);
app.use(userRoute);
app.use(errorMiddleware);

export default app;
