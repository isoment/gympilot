import { OnboardingRequestBody } from "gympilot-shared-resources";
import * as userRepository from "../data-access/repositories/userRepository";
import * as organizationRepository from "../data-access/repositories/organizationRepository";
import * as locationRepository from "../data-access/repositories/locationRepository";
import * as templateRepository from "../data-access/repositories/templateRepository";
import * as locationTemplateRepository from "../data-access/repositories/locationTemplateRepository";
import { OrganizationFields } from "../data-access/models/organization";
import { LocationFields } from "../data-access/models/location";
import { OnboardingReturn } from "./types";

export const onboardOwner = async (userId: number, body: OnboardingRequestBody): Promise<OnboardingReturn> => {
  const user = await userRepository.getUser("id", userId);
  if (!user) {
    return { success: false, response: "internalError", message: "Onboarding failed, user not found" };
  }

  if (user.owner_onboarding_complete) {
    return { success: false, response: "forbidden", message: "Onboarding was already complete" };
  }

  const organization = await _saveOrganization(user.id, body);
  if (!organization) {
    return { success: false, response: "internalError", message: "Failed to create organization" };
  }

  const location = await _saveLocation(organization.id, body.organization);
  if (!location) {
    return { success: false, response: "internalError", message: "Failed to create location" };
  }

  if (body.programs.length !== 0) {
    await _saveProgramTemplates(location.id, body.programs);
  }

  await user.update({
    owner_onboarding_complete: true,
  });

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

const _saveProgramTemplates = async (locationId: number, programs: OnboardingRequestBody["programs"]): Promise<void> => {
  for (const program of programs) {
    const template = await templateRepository.getTemplate("name", program);
    if (template) {
      await locationTemplateRepository.createLocationTemplate(locationId, template.id, false);
    }
  }
};
