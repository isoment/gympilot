import Joi from "joi";
import { timeFormatItems } from "gympilot-shared-resources";

const displayTimeFormatValidator = (value: string, helpers: Joi.CustomHelpers<string>) => {
  if (timeFormatItems.some((item) => item.value === value)) {
    return value;
  } else {
    return helpers.error("any.invalid", { message: "Invalid time format." });
  }
};

export default displayTimeFormatValidator;
