import express, { NextFunction, Request, Response } from "express";
import { postRegister } from "../requests/authRequestSchema";
import validateRequest from "../middleware/validateRequest";
import * as userRepository from "../data-access/repositories/userRepository";
import bcrypt from "bcrypt";
import authToken from "../services/authToken";

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
    const existingUser = await userRepository.getUser("email", req.body.email);
    if (existingUser) {
      return res.status(422).send("This email is already in use. Please use a different email or try logging in.");
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create a new user record with the owner role.
    const createdUser = await userRepository.createUserWithRole(
      {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: hashedPassword,
      },
      ["owner", "employee"],
    );

    if (createdUser) {
      // Get the newly created user
      const user = await userRepository.getUser("id", createdUser.id);

      if (user) {
        // Create a JWT token.
        const jwt = await authToken.generate(user.toJSON());

        // Return the token using Authorization header
        return res.header("Authorization", `Bearer ${jwt}`).status(200).json({
          message: "Registration Successful",
        });
      }
    } else {
      return res.status(400).json({
        message: "There was an error during registration",
      });
    }
  } catch (error) {
    res.status(500).send("Internal server error");
    next(error);
  }
});

export default authController;
