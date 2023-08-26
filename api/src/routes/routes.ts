import express from "express";

import experimentsController from "../controllers/experimentsController";
import authController from "../controllers/authController";

export default function defineRoutes(expressApp: express.Application): void {
  expressApp.use("/api/experiments", experimentsController);
  expressApp.use("/api/auth", authController);
}
