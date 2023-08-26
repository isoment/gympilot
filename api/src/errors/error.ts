import * as Http from "http";
import * as util from "util";
import { logger } from "../logger/logger";

let httpServerRef: Http.Server;

const errorHandler = {
  // Listen to the global process-level error events
  listenToErrorEvents: (httpServer: Http.Server): void => {
    httpServerRef = httpServer;
    process.on("uncaughtException", async (error) => {
      await errorHandler.handleError(error);
    });

    process.on("unhandledRejection", async (reason) => {
      await errorHandler.handleError(reason);
    });

    process.on("SIGTERM", async () => {
      logger.error("App received SIGTERM event, trying to gracefully close the server.");
      await terminateHttpServerAndExit();
    });

    process.on("SIGINT", async () => {
      logger.error("App received SIGINT event, trying to gracefully close the server");
      await terminateHttpServerAndExit();
    });
  },

  handleError: (errorToHandle: unknown): void => {
    try {
      const appError: AppError = normalizeError(errorToHandle);
      logger.error(appError.message, appError);
      // Fire any custom metric when handling error
      metricsExporter.fireMetric("error", { errorName: appError.name });
      // A common best practice is to crash when an unknown error (non-trusted) is being thrown
      if (!appError.isTrusted) {
        terminateHttpServerAndExit();
      }
    } catch (handlingError: unknown) {
      // Not using the logger here because it might have failed
      process.stdout.write("The error handler failed, here are the handler failure and then the origin error that it tried to handle");
      process.stdout.write(JSON.stringify(handlingError));
      process.stdout.write(JSON.stringify(errorToHandle));
    }
  },
};

const terminateHttpServerAndExit = async (): Promise<void> => {
  // Maybe implement more complex logic here (like using 'http-terminator' library)
  if (httpServerRef) {
    await httpServerRef.close();
  }
  process.exit();
};

// The input might not be 'AppError' or even 'Error' instance, the output of this function will be - AppError.
const normalizeError = (errorToHandle: unknown): AppError => {
  if (errorToHandle instanceof AppError) {
    return errorToHandle;
  }
  if (errorToHandle instanceof Error) {
    const appError = new AppError(errorToHandle.name, errorToHandle.message);
    appError.stack = errorToHandle.stack;
    return appError;
  }
  // meaning it could be any type,
  const inputType = typeof errorToHandle;
  return new AppError(
    "general-error",
    `Error Handler received a none error instance with type - ${inputType}, value - ${util.inspect(errorToHandle)}`,
  );
};

class AppError extends Error {
  constructor(public name: string, public message: string, public HTTPStatus: number = 500, public isTrusted = true, public cause?: unknown) {
    super(message);
  }
}

// This simulates a typical monitoring solution that allow firing custom metrics when
// like Prometheus, DataDog, CloudWatch, etc
const metricsExporter = {
  fireMetric: async (name: string, labels: object) => {
    // eslint-disable-next-line no-console
    logger.info("In real production code I will really fire metrics", {
      name,
      labels,
    });
  },
};

export { errorHandler, metricsExporter, AppError };
