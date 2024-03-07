import { NextFunction, Request, Response } from "express";
import * as response from "../services/http/responseHelper";
import { JwtPayload } from "jsonwebtoken";
import { logger } from "../logger/logger";

/**
 *  This middleware should be used after the accessToken is verified and the payload
 *  has been attached to the request object. It can take either a single role as a string
 *  or an array of roles.
 */
export default (role: string | string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const payload = req.verifiedUser;

    if (!payload || typeof payload === "string") {
      logger.error("Roles cannot be checked due to missing/incorrect payload", {
        type: typeof payload,
        payload,
      });
      return response.forbidden(res, "Action is forbidden");
    }

    const usersRoles: string[] = payload.roles;

    if (typeof role === "string") {
      if (usersRoles.includes(role)) {
        next();
        return;
      }
    } else {
      for (const item of role) {
        if (usersRoles.includes(item)) {
          next();
          return;
        }
      }
    }

    return response.forbidden(res, "Action is forbidden");
  };
};
