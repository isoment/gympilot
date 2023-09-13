import express from "express";

import authController from "../controllers/authController";

export default function defineRoutes(expressApp: express.Application): void {
  expressApp.use("/api/auth", authController);
}
