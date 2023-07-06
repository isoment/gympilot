import express, { Request, Response } from "express";
import experimentsController from "../controllers/experimentsController";

export default function defineRoutes(expressApp: express.Application) {
  expressApp.use("/api/experiments", experimentsController);
}
