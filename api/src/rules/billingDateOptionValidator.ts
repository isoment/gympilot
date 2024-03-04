import Joi from "joi";
import { billingDateOptions } from "gympilot-shared-resources";

const billingDateOptionValidator = (value: string, helpers: Joi.CustomHelpers<string>) => {
  if (billingDateOptions.some((item) => item.value === value)) {
    return value;
  } else {
    return helpers.error("any.invalid", { message: "Invalid billing date option." });
  }
};

export default billingDateOptionValidator;
