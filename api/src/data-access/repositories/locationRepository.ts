import { LocationFields } from "../models/location";
import model from "../models";
import { logger } from "../../logger/logger";

interface CreateLocationParams {
  organization_id: number;
  name: string;
  street_address: string;
  state_province: string;
  city: string;
  postal_code: string;
}

export async function createLocation(params: CreateLocationParams): Promise<LocationFields | null> {
  const organization = await model.Organization.findOne({ where: { id: params.organization_id } });
  if (!organization) {
    logger.error(`Tried to create a location with invalid organization_id ${params.organization_id}.`);
    return null;
  }

  return await model.Location.create(params);
}
