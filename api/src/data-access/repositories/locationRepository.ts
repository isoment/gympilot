import { LocationFields } from "../models/location";
import model from "../models";

interface CreateLocationParams {
  organization_id: number;
  name: string;
  street_address: string;
  city: string;
  postal_code: string;
}

export async function createLocation(params: CreateLocationParams): Promise<LocationFields | null> {
  const organization = await model.Organization.findOne({ where: { id: params.organization_id } });
  if (!organization) return null;

  return await model.Location.create(params);
}
