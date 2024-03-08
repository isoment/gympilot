import { OrganizationFields } from "../models/organization";
import model from "../models";

interface CreateOrganizationParams {
  owner_id: number;
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
 *  organization record for an owner.
 */
export async function createOrganization(params: CreateOrganizationParams): Promise<OrganizationFields | null> {
  const existing = await model.Organization.findOne({ where: { id: params.owner_id } });
  if (existing) return null;

  return await model.Organization.create(params);
}
