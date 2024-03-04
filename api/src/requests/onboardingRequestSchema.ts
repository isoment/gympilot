import Joi from "joi";
import countryCodeValidator from "../rules/countryCodeValidator";
import timezoneValidator from "../rules/timezoneValidator";
import displayDateFormatValidator from "../rules/displayDateFormatValidator";
import displayTimeFormatValidator from "../rules/displayTimeFormatValidator";
import currencyValidator from "../rules/currencyValidator";
import billingDateOptionValidator from "../rules/billingDateOptionValidator";

export const postOnboarding = () => {
  const schema = Joi.object({
    organization: Joi.object({
      organization_name: Joi.string().min(2).max(255).required(),
      location_name: Joi.string().min(2).max(255).required(),
      street_address: Joi.string().min(5).max(255).required(),
      city: Joi.string().min(2).max(255).required(),
      postal_code: Joi.string().min(2).max(255).required(),
      country: Joi.string().custom(countryCodeValidator).required().messages({
        "any.invalid": "Invalid country code.",
      }),
    }),
    programs: Joi.array().items(Joi.string().max(255)).required().empty(),
    timezone: Joi.object({
      timezone: Joi.string().custom(timezoneValidator).required().messages({
        "any.invalid": "Invalid timezone.",
      }),
      date_format: Joi.string().custom(displayDateFormatValidator).required().messages({
        "any.invalid": "Invalid date format.",
      }),
      time_format: Joi.string().custom(displayTimeFormatValidator).required().messages({
        "any.invalid": "Invalid time format.",
      }),
    }),
    billing: Joi.object({
      currency: Joi.string().custom(currencyValidator).required().messages({
        "any.invalid": "Invalid currency.",
      }),
      billing_date: Joi.string().custom(billingDateOptionValidator).required().messages({
        "any.invalid": "Invalid billing date option.",
      }),
      allow_cancellation: Joi.number().integer().min(0).max(1).required(),
    }),
  }).options({ abortEarly: false });
  return schema;
};
