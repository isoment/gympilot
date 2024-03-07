import { NextFunction, Request, Response } from "express";
import * as response from "../services/http/responseHelper";
import { logger } from "../logger/logger";

/**
 *  This middleware should be used after the accessToken is verified and the payload
 *  has been attached to the request object. It takes a string with one or more roles
 *  and checks to see if the user has one of them.
 *  @param role for example... "owner|employee|trainer"
 */
export default (role: string) => {
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

    for (const item of role.split("|")) {
      if (usersRoles.includes(item)) {
        next();
        return;
      }
    }

    return response.forbidden(res, "Action is forbidden");
  };
};
