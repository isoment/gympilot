import Joi from "joi";
import { validCountry } from "gympilot-shared-resources";

const countryCodeValidator = (value: string, helpers: Joi.CustomHelpers<string>) => {
  if (validCountry(value)) {
    return value;
  } else {
    return helpers.error("any.invalid", { message: "Invalid country code." });
  }
};

export default countryCodeValidator;
