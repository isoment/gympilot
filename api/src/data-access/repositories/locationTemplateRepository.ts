import model from "../models";
import { LocationTemplateFields } from "../models/locationTemplate";

/**
 *  We might have already verified the foreign keys are valid. If so we can skip the check.
 */
export async function createLocationTemplate(locationId: number, templateId: number, keyCheck = true): Promise<LocationTemplateFields | null> {
  if (keyCheck) {
    const location = await model.Location.findByPk(locationId);
    if (!location) return null;

    const template = await model.Template.findByPk(templateId);
    if (!template) return null;
  }

  return await model.LocationTemplate.create({
    location_id: locationId,
    template_id: templateId,
  });
}
