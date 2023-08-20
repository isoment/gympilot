import express, { NextFunction, Request, Response } from "express";
import { postRegister } from "../requests/authRequestSchema";
import validateRequest from "../middleware/validateRequest";
import * as userRepository from "../data-access/repositories/userRepository";
import bcrypt from "bcrypt";
import authToken from "../services/authToken";
import { internalError } from "../services/http/responseHelper";
import { logger } from "../logger/logger";
import _ from "lodash";

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
    const existingUser = await userRepository.getUser("email", req.body.email);
    if (existingUser) {
      return res.status(422).send("This email is already in use. Please use a different email or try logging in.");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

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
      const user = await userRepository.getUser("id", createdUser.id);

      if (user) {
        const jwt = await authToken.generate(user.toJSON());

        return res.header("Authorization", `Bearer ${jwt}`).status(200).json({
          message: "Registration Successful",
        });
      } else {
        logger.error(
          "User record created during registration but there was an error fetching record",
          _.omit(req.body, ["password", "password_verify"]),
        );
        return internalError(res, "There was an error during registration");
      }
    } else {
      logger.error("Created user was not found, cannot generate token", _.omit(req.body, ["password", "password_verify"]));
      return internalError(res, "There was an error during registration");
    }
  } catch (error) {
    res.status(500).send("Internal server error");
    next(error);
  }
});

export default authController;
