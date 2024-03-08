import express, { NextFunction, Request, Response } from "express";
import * as response from "../services/http/responseHelper";
import { logger } from "../logger/logger";
import validateRequest from "../middleware/validateRequest";
import { postOnboarding } from "../requests/onboardingRequestSchema";
import verifyAccessToken from "../middleware/verifyAccessToken";
import userHasRole from "../middleware/userHasRole";
import * as userRepository from "../data-access/repositories/userRepository";
import * as organizationRepository from "../data-access/repositories/organizationRepository";
import * as locationRepository from "../data-access/repositories/locationRepository";

const onboardingController = express.Router();

// This goes in the shared resources package
export interface OnboardingRequestBody {
  organization: {
    organization_name: string;
    country: string;
    location_name: string;
    street_address: string;
    city: string;
    postal_code: string;
  };
  programs: string[] | [];
  timezone: {
    date_format: string;
    time_format: string;
    timezone: string;
  };
  billing: {
    currency: string;
    billing_date: string;
    allow_cancellation: 1 | 0;
  };
}

onboardingController.post(
  "/",
  [verifyAccessToken, userHasRole("owner"), validateRequest(postOnboarding)],
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = req.body as OnboardingRequestBody;

      const user = await userRepository.getUser("id", req.verifiedUser?.id);

      if (!user) {
        logger.error("User not found during onboarding", { user: req.verifiedUser, body });
        return response.internalError(res, "Onboarding failed, user not found");
      }

      const organization = await organizationRepository.createOrganization({
        owner_id: user.id,
        name: body.organization.organization_name,
        country: body.organization.country,
        timezone: body.timezone.timezone,
        date_format: body.timezone.date_format,
        time_format: body.timezone.time_format,
        currency: body.billing.currency,
        billing_date: body.billing.billing_date,
        allow_cancellation: body.billing.allow_cancellation ? true : false,
      });

      if (!organization) {
        logger.error("Failed to create organization", { user: req.verifiedUser, body });
        return response.internalError(res, "Failed to create organization");
      }

      const location = await locationRepository.createLocation({
        organization_id: organization.id,
        name: body.organization.location_name,
        street_address: body.organization.street_address,
        city: body.organization.city,
        postal_code: body.organization.postal_code,
      });

      if (!location) {
        logger.error("Failed to create location", { user: req.verifiedUser, body });
        return response.internalError(res, "Failed to create location");
      }

      return response.success(res, "Onboarding Successful");
    } catch (error) {
      console.log(error);
      response.internalError(res);
      next(error);
    }
  },
);

export default onboardingController;
