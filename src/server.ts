import dotenv from "dotenv";
import app from "./core/app";
import logger from "./core/logger";

dotenv.config();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  logger.info(`Server is running on http://127.0.0.1:${PORT}`);
});
