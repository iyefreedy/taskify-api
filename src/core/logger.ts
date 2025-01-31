import winston from 'winston';

const { combine, colorize, simple, prettyPrint, timestamp } = winston.format;

const consoleTransport = new winston.transports.Console({
  format: combine(colorize(), simple()),
});

const fileTransport = new winston.transports.File({
  level: 'error',
  filename: './logs/error.log',
  format: combine(timestamp(), prettyPrint()),
});

const transports =
  process.env.NODE_ENV === 'production'
    ? [consoleTransport, fileTransport]
    : [consoleTransport];

const logger = winston.createLogger({
  transports,
});

export default logger;
