import express from "express";
import experimentsController from "../controllers/experimentsController";

export default function defineRoutes(expressApp: express.Application): void {
  expressApp.use("/api/experiments", experimentsController);
}
