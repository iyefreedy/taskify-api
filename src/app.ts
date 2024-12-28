import express from "express";
import errorMiddleware from "./middleware/error-middleware";

const app = express();
app.use(express.json());

app.use(errorMiddleware);

export default app;
