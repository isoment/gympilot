import { OnboardingRequestBody } from "gympilot-shared-resources";
import * as userRepository from "../data-access/repositories/userRepository";
import * as organizationRepository from "../data-access/repositories/organizationRepository";
import * as locationRepository from "../data-access/repositories/locationRepository";
import { OrganizationFields } from "@base/data-access/models/organization";
import { LocationFields } from "@base/data-access/models/location";

interface OnboardingResult {
  success: boolean;
  response: string;
  message: string;
}

export const onboardOwner = async (userId: number, body: OnboardingRequestBody): Promise<OnboardingResult> => {
  const user = await userRepository.getUser("id", userId);
  if (!user) {
    return { success: false, response: "internalError", message: "Onboarding failed, user not found" };
  }

  const organization = await _saveOrganization(user.id, body);
  if (!organization) {
    return { success: false, response: "internalError", message: "Failed to create organization" };
  }

  const location = await _saveLocation(organization.id, body.organization);
  if (!location) {
    return { success: false, response: "internalError", message: "Failed to create location" };
  }

  return { success: true, response: "success", message: "Onboarding Successful" };
};

const _saveOrganization = async (userId: number, body: OnboardingRequestBody): Promise<OrganizationFields | null> => {
  return await organizationRepository.createOrganization({
    owner_id: userId,
    name: body.organization.organization_name,
    country: body.organization.country,
    timezone: body.timezone.timezone,
    date_format: body.timezone.date_format,
    time_format: body.timezone.time_format,
    currency: body.billing.currency,
    billing_date: body.billing.billing_date,
    allow_cancellation: body.billing.allow_cancellation ? true : false,
  });
};

const _saveLocation = async (organizationId: number, organization: OnboardingRequestBody["organization"]): Promise<LocationFields | null> => {
  return await locationRepository.createLocation({
    organization_id: organizationId,
    name: organization.location_name,
    street_address: organization.street_address,
    city: organization.city,
    postal_code: organization.postal_code,
  });
};
