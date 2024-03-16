import express, { NextFunction, Request, Response } from "express";
import { OnboardingRequestBody } from "gympilot-shared-resources";
import * as response from "../services/http/responseHelper";
import { logger } from "../logger/logger";
import validateRequest from "../middleware/validateRequest";
import { postOnboarding } from "../requests/onboardingRequestSchema";
import verifyAccessToken from "../middleware/verifyAccessToken";
import userHasRole from "../middleware/userHasRole";
import { onboardOwner } from "../domains/onboarding";

const onboardingController = express.Router();

onboardingController.post(
  "/",
  [verifyAccessToken, userHasRole("owner"), validateRequest(postOnboarding)],
  async (req: Request<any, any, OnboardingRequestBody>, res: Response, next: NextFunction) => {
    try {
      const result = await onboardOwner(req.verifiedUser?.id, req.body);

      if (result.success) {
        return response.success(res, result.message);
      } else if (!result.success && result.response === "forbidden") {
        logger.error(result.message, { user: req.verifiedUser, request: req.body });
        return response.forbidden(res, result.message);
      } else {
        logger.error(result.message, { user: req.verifiedUser, request: req.body });
        return response.internalError(res, result.message);
      }
    } catch (error) {
      response.internalError(res);
      next(error);
    }
  },
);

export default onboardingController;
