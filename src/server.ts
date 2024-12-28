import app from "./app";
import logging from "./utils/logging";

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  logging.info(`Server is running on http://localhost:${PORT}`);
});
