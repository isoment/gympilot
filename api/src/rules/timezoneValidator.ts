import Joi from "joi";
import { validTimezone } from "gympilot-shared-resources";

const timezoneValidator = (value: string, helpers: Joi.CustomHelpers<string>) => {
  if (validTimezone(value)) {
    return value;
  } else {
    return helpers.error("any.invalid", { message: "Invalid timezone." });
  }
};

export default timezoneValidator;
