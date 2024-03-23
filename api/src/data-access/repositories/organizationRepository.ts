import { OrganizationFields } from "../models/organization";
import model from "../models";
import { logger } from "../../logger/logger";

interface CreateOrganizationParams {
  owner_id: number;
  product_tier_id: number;
  name: string;
  country: string;
  timezone: string;
  date_format: string;
  time_format: string;
  currency: string;
  billing_date: string;
  allow_cancellation: boolean;
}

/**
 *  There is a unique constraint on the owner_id field since there should only ever be one
 *  organization record for an owner so if one is found return null indicating creation failed.
 */
export async function createOrganization(params: CreateOrganizationParams): Promise<OrganizationFields | null> {
  const existing = await model.Organization.findOne({ where: { owner_id: params.owner_id } });
  if (existing) {
    logger.error(`An organization, ID: ${existing.id} with owner_id ${existing.owner_id} already exists.`);
    return null;
  }

  return await model.Organization.create(params);
}
