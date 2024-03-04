import Joi from "joi";
import { availableCurrencies } from "gympilot-shared-resources";

const currencyValidator = (value: string, helpers: Joi.CustomHelpers<string>) => {
  if (availableCurrencies.some((item) => item.value === value)) {
    return value;
  } else {
    return helpers.error("any.invalid", { message: "Invalid currency." });
  }
};

export default currencyValidator;
