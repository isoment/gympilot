import { createLogger, format } from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

interface Logger {
  info(message: string, ...args: unknown[]): void;
  error(message: string, ...args: unknown[]): void;
  debug(message: string, ...args: unknown[]): void;
  warn(message: string, ...args: unknown[]): void;
}

// We can use this to filter out the non error logs
const errorFilter = format((info) => {
  if (info.level === "error") {
    return info;
  }
  return false;
});

const selectedTransports = [
  new DailyRotateFile({ filename: "%DATE%.log", dirname: "storage/logs/combined" }),
  new DailyRotateFile({
    filename: "%DATE%.log",
    dirname: "storage/logs/error",
    format: format.combine(errorFilter(), format.timestamp(), format.json()),
  }),
];

export class LoggerWrapper implements Logger {
  #underlyingLogger: Logger | null = null;

  #getInitializeLogger(): Logger {
    if (!this.#underlyingLogger) {
      this.configureLogger();
    }
    return this.#underlyingLogger!;
  }

  configureLogger(): void {
    if (!this.#underlyingLogger) {
      const winston = createLogger({
        level: "info",
        format: format.combine(
          format.timestamp({
            format: "YYYY-MM-DD HH:mm:ss",
          }),
          format.errors({ stack: true }),
          format.splat(),
          format.json(),
        ),
        defaultMeta: { service: "gympilot" },
        transports: selectedTransports,
      });
      this.#underlyingLogger = winston;
    }
  }

  resetLogger(): void {
    if (this.#underlyingLogger) {
      this.#underlyingLogger = null;
    }
  }

  info(message: string, ...args: unknown[]): void {
    this.#getInitializeLogger().info(message, args);
  }

  error(message: string, ...args: unknown[]): void {
    this.#getInitializeLogger().error(message, args);
  }

  debug(message: string, ...args: unknown[]): void {
    this.#getInitializeLogger().debug(message, args);
  }

  warn(message: string, ...args: unknown[]): void {
    this.#getInitializeLogger().warn(message, args);
  }
}

// We can make the logger class a singleton
export const logger = new LoggerWrapper();
