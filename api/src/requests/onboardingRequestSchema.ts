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
        "string.empty": "Organization name is required.",
        "any.required": "Organization name is required.",
        "any.invalid": "Organization name must be a string.",
        "string.min": "Organization name must be at least {#limit} characters long.",
        "string.max": "Organization name cannot be more than {#limit} characters long.",
      }),
      location_name: Joi.string().min(2).max(255).required().messages({
        "string.empty": "Location name is required.",
        "any.required": "Location name is required.",
        "any.invalid": "Location must be a string.",
        "string.min": "Location name must be at least {#limit} characters long.",
        "string.max": "Location name cannot be more than {#limit} characters long.",
      }),
      street_address: Joi.string().min(5).max(255).required().messages({
        "string.empty": "Address is required.",
        "any.required": "Address is required.",
        "any.invalid": "Address must be a string.",
        "string.min": "Address must be at least {#limit} characters long.",
        "string.max": "Address cannot be more than {#limit} characters long.",
      }),
      city: Joi.string().min(2).max(255).required().messages({
        "string.empty": "City is required.",
        "any.required": "City is required.",
        "any.invalid": "City must be a string.",
        "string.min": "City must be at least {#limit} characters long.",
        "string.max": "City cannot be more than {#limit} characters long.",
      }),
      postal_code: Joi.string().min(2).max(255).required().messages({
        "string.empty": "Postal code is required.",
        "any.required": "Postal code is required.",
        "any.invalid": "Postal code must be a string.",
        "string.min": "Postal code must be at least {#limit} characters long.",
        "string.max": "Postal code cannot be more than {#limit} characters long.",
      }),
      country: Joi.string().custom(countryCodeValidator).required().messages({
        "any.invalid": "Invalid country code.",
        "string.empty": "Country code is required.",
      }),
    }).required(),
    programs: Joi.array().items(Joi.string().max(255)).required().empty(),
    timezone: Joi.object({
      timezone: Joi.string().custom(timezoneValidator).required().messages({
        "any.invalid": "Invalid timezone.",
        "string.empty": "Timezone is required.",
      }),
      date_format: Joi.string().custom(displayDateFormatValidator).required().messages({
        "any.invalid": "Invalid date format.",
        "string.empty": "Timezone is required.",
      }),
      time_format: Joi.string().custom(displayTimeFormatValidator).required().messages({
        "any.invalid": "Invalid time format.",
        "string.empty": "Timezone is required.",
      }),
    }).required(),
    billing: Joi.object({
      currency: Joi.string().custom(currencyValidator).required().messages({
        "any.invalid": "Invalid currency.",
        "string.empty": "Currency is required.",
      }),
      billing_date: Joi.string().custom(billingDateOptionValidator).required().messages({
        "any.invalid": "Invalid billing date option.",
        "string.empty": "Billing date option is required.",
        "any.required": "Billing date option is required.",
      }),
      allow_cancellation: Joi.number().integer().min(0).max(1).required().messages({
        "number.empty": "Cancellation option is required.",
        "any.required": "Cancellation option is required.",
        "number.min": "Cancellation option must be boolean 0 or 1.",
        "number.max": "Cancellation option must be boolean 0 or 1.",
        "any.invalid": "Cancellation option must be boolean 0 or 1.",
      }),
    }).required(),
  }).options({ abortEarly: false });
  return schema;
};
