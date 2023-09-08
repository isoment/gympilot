import { AddressInfo } from "net";
import { Server } from "http";
import express from "express";
import cookieParser from "cookie-parser";

import "dotenv/config";
import defineRoutes from "../routes/routes";
import { errorHandler } from "../errors/error";
import { logger } from "../logger/logger";
import { appConfig } from "../config/app";
import { email } from "../services/notification/email/email";
import { memoryStore } from "../data-access/memory-store/memoryStore";
import { database } from "../data-access/models/database";

let connection: Server;

async function startWebServer(): Promise<AddressInfo> {
  logger.configure();
  email.configure();
  database.configure();
  await memoryStore.configure();
  const expressApp = express();
  expressApp.use(express.json());
  expressApp.use(express.urlencoded({ extended: true }));
  expressApp.use(cookieParser());
  defineRoutes(expressApp);
  defineErrorHandlingMiddleware(expressApp);
  const APIAddress = await openConnection(expressApp);
  return APIAddress;
}

async function stopWebServer(): Promise<void> {
  return new Promise<void>(async (resolve) => {
    if (connection !== undefined) {
      await database.close();
      await memoryStore.close();
      connection.close(() => {
        resolve();
      });
    }
  });
}

async function openConnection(expressApp: express.Application): Promise<AddressInfo> {
  return new Promise((resolve) => {
    // If the application is in test mode use a dynamic port 0 so multiple webservers can be used in multi-process testing
    const port = appConfig.node === "test" ? appConfig.testPort : appConfig.port;
    connection = expressApp.listen(port, () => {
      logger.info("Server started successfully", connection.address());
      errorHandler.listenToErrorEvents(connection);
      resolve(connection.address() as AddressInfo);
    });
  });
}

function defineErrorHandlingMiddleware(expressApp: express.Application): void {
  expressApp.use(
    async (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      error: any,
      req: express.Request,
      res: express.Response,
      // Express requires next function in default error handlers
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      next: express.NextFunction,
    ) => {
      if (error && typeof error === "object") {
        if (error.isTrusted === undefined || error.isTrusted === null) {
          error.isTrusted = true; // Error during a specific request is usually not fatal and should not lead to process exit
        }
      }
      // Best Practice: Pass all error to a centralized error handler so they get treated equally
      errorHandler.handleError(error);
      res.status(error?.HTTPStatus || 500).end();
    },
  );
}

export { startWebServer, stopWebServer };
