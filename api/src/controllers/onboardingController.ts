import express, { NextFunction, Request, Response } from "express";
import * as response from "../services/http/responseHelper";
import validateRequest from "../middleware/validateRequest";
import { postOnboarding } from "../requests/onboardingRequestSchema";

const onboardingController = express.Router();

/**
 *  We will also want to use the verifyAccess token middleware and check if the user has a 'owner' role
 */
onboardingController.post("/", [validateRequest(postOnboarding)], async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log(req.body);
    return response.success(res, "Onboarding Successful");
  } catch (error) {
    console.log(error);
    response.internalError(res);
    next(error);
  }
});

export default onboardingController;
