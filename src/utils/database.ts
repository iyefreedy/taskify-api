import { PrismaClient } from "@prisma/client";
import logging from "./logging";

const database = new PrismaClient({
  log: [
    {
      emit: "event",
      level: "query",
    },
    {
      emit: "event",
      level: "info",
    },
    {
      emit: "event",
      level: "warn",
    },
    {
      emit: "event",
      level: "error",
    },
  ],
});

database.$on("query", (e) => {
  logging.info(`Query: ${e.query} ${e.params}, ${e.duration}ms`);
});

database.$on("info", (e) => {
  logging.info(`Info: ${e.message}`);
});

database.$on("warn", (e) => {
  logging.warn(`Warn: ${e.message}`);
});

database.$on("error", (e) => {
  logging.error(`Error: ${e.message}`);
});

export default database;
