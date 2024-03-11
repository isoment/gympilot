import express, { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import _ from "lodash";

import { postLogin, postRegister, postForgotPassword, postResetPassword } from "../requests/authRequestSchema";
import validateRequest from "../middleware/validateRequest";
import * as userRepository from "../data-access/repositories/userRepository";
import * as passwordResetRepository from "../data-access/repositories/passwordResetRepository";
import * as refreshTokenStore from "../data-access/memory-store/refreshTokenStore";
import authToken from "../services/authToken";
import * as response from "../services/http/responseHelper";
import { logger } from "../logger/logger";
import { email } from "../services/notification/email/email";
import { compareDate } from "../services/dateTime";
import verifyAccessToken from "../middleware/verifyAccessToken";
import { appConfig } from "../config/app";
import tokenPayload from "../services/tokenPayload";

const authController = express.Router();

/**
 *  The endpoint to login a user. The request is validated and must contain an email and password. If there is
 *  no user with that email an error is returned. If the user is found we need to compare the hashed password
 *  and if they match return a JWT token.
 */
authController.post("/login", [validateRequest(postLogin)], async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await userRepository.getUser("email", req.body.email, false);

    if (!user) {
      return response.unprocessableContent(res, "These credentials do not match our records");
    }

    const passwordValid = await bcrypt.compare(req.body.password, user.password);

    if (!passwordValid) {
      return response.unprocessableContent(res, "These credentials do not match our records");
    }

    const payload = tokenPayload.prepare(user);
    const accessToken = await authToken.create(payload, { expiresIn: appConfig.accessTokenExp });
    const refreshToken = await authToken.create(payload, { expiresIn: appConfig.refreshTokenExp });

    // Check to see if there is a refresh token in memory store, if there is remove it.
    const existingToken = await refreshTokenStore.get(user.id);
    if (existingToken) {
      await refreshTokenStore.remove(user.id);
    }

    await refreshTokenStore.set(user.id, refreshToken, appConfig.refreshTokenExp);

    res.cookie("refresh_token", refreshToken, { httpOnly: true, maxAge: appConfig.refreshTokenExp * 1000 });

    return response.success(res, "Login Successful", { Authorization: `Bearer ${accessToken}` });
  } catch (error) {
    response.internalError(res);
    next(error);
  }
});

/**
 *  The endpoint to register new users. First we validate the request and ensure that there is no existing
 *  user with the same email. We create a hash of the password and then create a new user with the desired
 *  roles. We then want to generate a JWT token and return it in the responses Authorization header as a
 *  Bearer token.
 */
authController.post("/register", [validateRequest(postRegister)], async (req: Request, res: Response, next: NextFunction) => {
  try {
    const existingUser = await userRepository.getUser("email", req.body.email);
    if (existingUser) {
      return response.unprocessableContent(res, "This email is already in use, please use a different email or try logging in");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const createdUser = await userRepository.createUserWithRole(
      {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: hashedPassword,
        owner_onboarding_complete: false,
      },
      ["owner"],
    );

    if (!createdUser) {
      logger.error("Created user was not found, cannot generate token", _.omit(req.body, ["password", "password_verify"]));
      return response.internalError(res, "There was an error during registration");
    }

    const user = await userRepository.getUser("id", createdUser.id);

    if (!user) {
      logger.error(
        "User record created during registration but there was an error fetching record",
        _.omit(req.body, ["password", "password_verify"]),
      );
      return response.internalError(res, "There was an error during registration");
    }

    const payload = tokenPayload.prepare(user);
    const accessToken = await authToken.create(payload, { expiresIn: appConfig.accessTokenExp });
    const refreshToken = await authToken.create(payload, { expiresIn: appConfig.refreshTokenExp });

    await refreshTokenStore.set(user.id, refreshToken, appConfig.refreshTokenExp);

    res.cookie("refresh_token", refreshToken, { httpOnly: true, maxAge: appConfig.refreshTokenExp * 1000 });

    return response.success(res, "Registration Successful", { Authorization: `Bearer ${accessToken}` });
  } catch (error) {
    response.internalError(res);
    next(error);
  }
});

/**
 *  The endpoint to initiate password reset. It accepts the user's email and generates a unique token
 *  that is associated with the user's account. The token is then stored in the database, and an email
 *  containing a link with the token is sent to the user's email address.
 */
authController.post("/forgot-password", [validateRequest(postForgotPassword)], async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await userRepository.getUser("email", req.body.email, false);
    if (!user) {
      return response.unprocessableContent(res, "The email was not found, please ensure it is correct");
    }

    const existingReset = await passwordResetRepository.findPasswordReset("email", req.body.email);

    if (existingReset) {
      existingReset.destroy();
    }

    const passwordReset = await passwordResetRepository.createPasswordReset({ email: req.body.email });

    if (!passwordReset) {
      logger.error(`There was a failure when creating the password reset record for user: ${req.body.email}`);
      return response.internalError(res, "There was an error during password reset");
    }

    email.passwordReset(req.body.email, passwordReset.token);

    return response.success(res, "Reset password email was sent");
  } catch (error) {
    response.internalError(res);
    next(error);
  }
});

/**
 *  The endpoint to reset a users password after they have clicked on the password reset link email link. The
 *  :token parameter in the URL identifies the user's account. The user's new password is sent in the request body.
 *  The endpoint verifies the token, updates the user's password in the database, and completes the password reset process.
 */
authController.post("/reset-password/:token", [validateRequest(postResetPassword)], async (req: Request, res: Response, next: NextFunction) => {
  try {
    const passwordReset = await passwordResetRepository.findPasswordReset("token", req.params.token);

    if (!passwordReset) {
      return response.unprocessableContent(res, "The password reset token does not match our records");
    }

    if (compareDate(new Date(), passwordReset.expires) !== -1) {
      await passwordReset.destroy();
      return response.unprocessableContent(res, "The password reset token has expired");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const updateUser = await userRepository.updateUser("email", passwordReset.email, { password: hashedPassword });

    if (updateUser === 1) {
      passwordReset.destroy();
      return response.success(res, "Password reset successfully");
    } else {
      return response.internalError(res, "There was an error resetting the password");
    }
  } catch (error) {
    response.internalError(res);
    next(error);
  }
});

/**
 *  The endpoint to grant a new access token when a valid refresh token is provided. The refresh token
 *  is stored in an httpOnly cookie for security. We will parse the cookie to get the token.
 */
authController.post("/refresh-token", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cookies = req.cookies;

    if (!cookies?.refresh_token) {
      return response.unauthorized(res, "Missing refresh token cookie");
    }

    const refreshToken = cookies.refresh_token;

    let payload: any;
    try {
      payload = await authToken.verify(refreshToken);
    } catch (error) {
      return response.unauthorized(res, "The refresh token is invalid");
    }

    // If there are no issues we will generate a new access token
    const removeExpIat = _.omit(payload, ["exp", "iat"]);

    // Check to see if the refresh token exists in in memory store
    const tokenFromStore = await refreshTokenStore.get(removeExpIat.id);
    if (!tokenFromStore || refreshToken !== tokenFromStore) {
      return response.unauthorized(res, "The refresh token is invalid");
    }

    const accessToken = await authToken.create(removeExpIat, { expiresIn: appConfig.accessTokenExp });

    return response.success(res, "Access token generated successfully", { Authorization: `Bearer ${accessToken}` });
  } catch (error) {
    response.internalError(res);
    next(error);
  }
});

/**
 *  The endpoint to log a user out. We do this by deleting the refresh token from the memory store and unsetting the
 *  cookie. We also want to remove the access token on the frontend.
 */
authController.post("/logout", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cookies = req.cookies;

    if (!cookies?.refresh_token) {
      return response.success(res, "Logout successful");
    }

    const refreshToken = cookies.refresh_token;

    res.cookie("refresh_token", "", { expires: new Date(0), httpOnly: true });

    let payload: any;
    try {
      payload = await authToken.verify(refreshToken);
    } catch (error) {
      return response.success(res, "Logout successful");
    }

    await refreshTokenStore.remove(payload.id);

    return response.success(res, "Logout successful");
  } catch (error) {
    response.internalError(res);
    next(error);
  }
});

authController.get("/user", [verifyAccessToken], async (req: Request, res: Response, next: NextFunction) => {
  return response.success(res, "Success!");
});

export default authController;
