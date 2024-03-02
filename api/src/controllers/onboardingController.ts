import express, { NextFunction, Request, Response } from "express";
import * as response from "../services/http/responseHelper";

const onboardingController = express.Router();

onboardingController.post("/", async (req: Request, res: Response, next: NextFunction) => {
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
