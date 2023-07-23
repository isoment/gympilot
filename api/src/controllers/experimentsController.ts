import express, { NextFunction, Request, Response } from "express";
import * as userRepository from "../data-access/repositories/userRepository";

const experimentsController = express.Router();

experimentsController.get("/", (req: Request, res: Response): void => {
  res.status(200).json({ test: "Hello World" });
});

experimentsController.get("/test", (req: Request, res: Response): void => {
  res.status(200).json({ test: "Test" });
});

experimentsController.get("/user/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await userRepository.getUser(1);
    return res.status(200).json({ user: user });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

export default experimentsController;
