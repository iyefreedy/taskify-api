import winston from "winston";

const consoleTransport = new winston.transports.Console({
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.simple()
  ),
});

const transports =
  process.env.NODE_ENV === "production"
    ? [
        consoleTransport,
        new winston.transports.File({ filename: "error.log", level: "error" }),
        new winston.transports.File({ filename: "combined.log" }),
      ]
    : [consoleTransport];

const logging = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports,
});

export default logging;
