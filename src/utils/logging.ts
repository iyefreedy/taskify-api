import winston from "winston";

const transports =
  process.env.NODE_ENV === "production"
    ? [
        new winston.transports.Console(),
        new winston.transports.File({ filename: "error.log", level: "error" }),
        new winston.transports.File({ filename: "combined.log" }),
      ]
    : [new winston.transports.Console()];

const logging = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports,
});

export default logging;
