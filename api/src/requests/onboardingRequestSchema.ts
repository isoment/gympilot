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
      organization_name: Joi.string().min(2).max(255).required().messages({
        "string.empty": "Organization name required",
        "string.min": "Organization name must be at least {#limit} characters long",
        "string.max": "Organization name cannot be more than {#limit} characters long",
      }),
      location_name: Joi.string().min(2).max(255).required().messages({
        "string.empty": "Location name required",
        "string.min": "Location name must be at least {#limit} characters long",
        "string.max": "Location name cannot be more than {#limit} characters long",
      }),
      street_address: Joi.string().min(5).max(255).required().messages({
        "string.empty": "Address required",
        "string.min": "Address must be at least {#limit} characters long",
        "string.max": "Address cannot be more than {#limit} characters long",
      }),
      city: Joi.string().min(2).max(255).required().messages({
        "string.empty": "City required",
        "string.min": "City must be at least {#limit} characters long",
        "string.max": "City cannot be more than {#limit} characters long",
      }),
      postal_code: Joi.string().min(2).max(255).required().messages({
        "string.empty": "Postal code required",
        "string.min": "Postal code must be at least {#limit} characters long",
        "string.max": "Postal code cannot be more than {#limit} characters long",
      }),
      country: Joi.string().custom(countryCodeValidator).required().messages({
        "any.invalid": "Invalid country code.",
      }),
    }).required(),
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
    }).required(),
    billing: Joi.object({
      currency: Joi.string().custom(currencyValidator).required().messages({
        "any.invalid": "Invalid currency.",
      }),
      billing_date: Joi.string().custom(billingDateOptionValidator).required().messages({
        "any.invalid": "Invalid billing date option.",
      }),
      allow_cancellation: Joi.number().integer().min(0).max(1).required(),
    }).required(),
  }).options({ abortEarly: false });
  return schema;
};
