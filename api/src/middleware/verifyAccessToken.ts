import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import * as response from "../services/http/responseHelper";
import { logger } from "../logger/logger";
import authToken from "../services/authToken";

// This allows us to attach a verifiedUser property to the Request object.
declare module "express-serve-static-core" {
  interface Request {
    verifiedUser?: jwt.JwtPayload;
  }
}

/**
 *  Check that the given access token is valid and attach the payload to the request
 *  for use further down the middleware pipeline.
 */
export default async (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("Authorization");

  if (!token) {
    return response.unauthorized(res, "Access denied. No token provided");
  }

  // Tokens should have a Bearer prefix, we want to remove this.
  const bearer = token.split(" ")[1];

  try {
    const decoded = await authToken.verify(bearer);
    if (!decoded || typeof decoded === "string") {
      return response.unauthorized(res, "Token is invalid");
    }
    req.verifiedUser = decoded;
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return response.unauthorized(res, "Token has expired");
    } else if (error instanceof jwt.JsonWebTokenError) {
      return response.unauthorized(res, "Token is invalid");
    } else {
      logger.error("There was an error verifying the JWT token in the auth middleware", error);
      return response.unauthorized(res, "There was an error during authentication");
    }
  }
};
