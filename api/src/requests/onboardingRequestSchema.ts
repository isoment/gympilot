import Joi from "joi";
import countryCodeValidator from "../rules/countryCodeValidator";

export const postOnboarding = () => {
  const schema = Joi.object({
    organization: Joi.object({
      organization_name: Joi.string().required(),
      location_name: Joi.string().required(),
      street_address: Joi.string().required(),
      city: Joi.string().required(),
      postal_code: Joi.string().required(),
      country: Joi.string().custom(countryCodeValidator).required().messages({
        "any.invalid": "Invalid country code",
      }),
    }),
    programs: Joi.array().items(Joi.string()).required().empty(),
    timezone: Joi.object({
      timezone: Joi.string().required(),
      date_format: Joi.string().required(),
      time_format: Joi.string().required(),
    }),
    billing: Joi.object({
      currency: Joi.string().required(),
      billing_date: Joi.string().required(),
      allow_cancellation: Joi.number().integer().min(0).max(1).required(),
    }),
  }).options({ abortEarly: false });
  return schema;
};
