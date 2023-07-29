import Joi from "joi";
import * as userRepository from "../data-access/repositories/userRepository";

/**
 *  Request body for POST "/api/auth/login"
 */
export const postLogin = () => {
  const schema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }).options({ abortEarly: false });
  return schema;
};

/**
 *  Request body for POST "/api/auth/register"
 */
export const postRegister = () => {
  const schema = Joi.object({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().min(5).max(255).required(),
    password_verify: Joi.string().min(5).max(255).required().valid(Joi.ref("password")).messages({
      "any.only": "Passwords do not match",
      "string.empty": "Password confirmation is required",
      "string.min": "Password confirmation must be at least {#limit} characters long",
      "string.max": "Password confirmation cannot be more than {#limit} characters long",
      "any.required": "Password confirmation is required",
    }),
  })
    .custom(async (values, helpers) => {
      const { email } = values;
      const userExists = await userRepository.getUser("email", email);
      if (userExists) {
        return helpers.error("any.invalid");
      }
      return values;
    })
    .options({ abortEarly: false });
  return schema;
};
