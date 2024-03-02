import express from "express";

import authController from "../controllers/authController";
import onboardingController from "../controllers/onboardingController";

export default function defineRoutes(expressApp: express.Application): void {
  expressApp.use("/api/auth", authController);
  expressApp.use("/api/onboarding", onboardingController);
}
