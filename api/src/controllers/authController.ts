import express, { NextFunction, Request, Response } from "express";
import * as userRepository from "../data-access/repositories/userRepository";

const authController = express.Router();

authController.get("/login", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await userRepository.getUser(Number(req.params.id));
    if (!user) {
      return res.status(404).send("User not found");
    }
    return res.status(200).json(user);
  } catch (error) {
    res.status(500).send("Internal server error");
    next(error);
  }
});

export default authController;
