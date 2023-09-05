import express from "express";

import authController from "../controllers/authController";
import experimentsController from "../controllers/experimentsController";

export default function defineRoutes(expressApp: express.Application): void {
  expressApp.use("/api/experiments", experimentsController);
  expressApp.use("/api/auth", authController);
}
