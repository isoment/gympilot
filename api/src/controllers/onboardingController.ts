import express, { NextFunction, Request, Response } from "express";
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
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const onboardingResult = await onboardOwner(req.verifiedUser?.id, req.body);

      if (onboardingResult.success) {
        return response.success(res, onboardingResult.message);
      } else {
        logger.error(onboardingResult.message, { user: req.verifiedUser, request: req.body });
        response.internalError(res, onboardingResult.message);
      }
    } catch (error) {
      console.log(error);
      response.internalError(res);
      next(error);
    }
  },
);

export default onboardingController;
