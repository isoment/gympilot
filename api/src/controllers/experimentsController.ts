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
    const user = await userRepository.getUser("id", Number(req.params.id));
    if (!user) {
      return res.status(404).send("User not found");
    }
    return res.status(200).json(user);
  } catch (error) {
    res.status(500).send("Internal server error");
    next(error);
  }
});

export default experimentsController;
