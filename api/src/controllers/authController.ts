import express, { NextFunction, Request, Response } from "express";
import { postRegister } from "../requests/authRequestSchema";
import validateRequest from "../middleware/validateRequest";
import * as userRepository from "../data-access/repositories/userRepository";

const authController = express.Router();

authController.post("/login", async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Need to validate the request.

    // We need to find the user. If they are not found return a response that credentials
    // do not match.

    // If the user is found a JWT is issued and returned.
    return res.status(200).json("Login");
  } catch (error) {
    res.status(500).send("Internal server error");
    next(error);
  }
});

authController.post("/register", [validateRequest(postRegister)], async (req: Request, res: Response, next: NextFunction) => {
  try {
    // We need to check if the email is already in use
    const user = await userRepository.getUser("email", req.body.email);
    if (user) {
      return res.status(422).send("This email is already in use. Please use a different email or try logging in.");
    }

    // Create a new user record. We also need to hash the password.

    // Return a JWT token.
    return res.status(200).json("Register");
  } catch (error) {
    res.status(500).send("Internal server error");
    next(error);
  }
});

export default authController;
