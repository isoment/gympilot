import Joi from "joi";
import * as userRepository from "../data-access/repositories/userRepository";

/**
 *  Request body for POST "/api/auth/login"
 */
export const postLogin = (request: Record<string, any>) => {
  const schema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }).options({ abortEarly: false });
  return schema.validate(request);
};

/**
 *  Request body for POST "/api/auth/register"
 */
export const postRegister = (request: Record<string, any>) => {
  const schema = Joi.object({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().min(5).max(255).required(),
    password_verify: Joi.string().min(5).max(255).required().valid(Joi.ref("password")),
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
  return schema.validate(request);
};
