import express, { NextFunction, Request, Response } from "express";
import * as userRepository from "../data-access/repositories/userRepository";

const experimentsController = express.Router();

experimentsController.get("/", (req: Request, res: Response): void => {
  res.status(200).json({ test: "Hello World" });
});

export default experimentsController;
