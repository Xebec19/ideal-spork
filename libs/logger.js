const winston = require("winston");

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  defaultMeta: { service: "logger-service" },
  transports: [
    new winston.transports.File({
      filename: "./log/error.log",
      level: "error",
    }),
    new winston.transports.Console(),
  ],
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
}

module.exports = logger;
