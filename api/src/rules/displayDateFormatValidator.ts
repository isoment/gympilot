import Joi from "joi";
import { dateFormatItems } from "gympilot-shared-resources";

const displayDateFormatValidator = (value: string, helpers: Joi.CustomHelpers<string>) => {
  if (dateFormatItems.some((item) => item.value === value)) {
    return value;
  } else {
    return helpers.error("any.invalid", { message: "Invalid date format." });
  }
};

export default displayDateFormatValidator;
