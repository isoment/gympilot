import Joi from "joi";

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
    password: Joi.string().min(8).max(255).required(),
    password_verify: Joi.string().min(8).max(255).required().valid(Joi.ref("password")).messages({
      "any.only": "Passwords do not match",
      "string.empty": "Password confirmation is required",
      "string.min": "Password confirmation must be at least {#limit} characters long",
      "string.max": "Password confirmation cannot be more than {#limit} characters long",
      "any.required": "Password confirmation is required",
    }),
  }).options({ abortEarly: false });
  return schema;
};

/**
 *  Request body for POST "/api/auth/forgot-password"
 */
export const postForgotPassword = () => {
  const schema = Joi.object({
    email: Joi.string().required().email(),
  }).options({ abortEarly: false });
  return schema;
};

/**
 *  Request body for POST "/api/auth/reset-password/:token"
 */
export const postResetPassword = () => {
  const schema = Joi.object({
    password: Joi.string().min(8).max(255).required(),
    password_verify: Joi.string().min(8).max(255).required().valid(Joi.ref("password")).messages({
      "any.only": "Passwords do not match",
      "string.empty": "Password confirmation is required",
      "string.min": "Password confirmation must be at least {#limit} characters long",
      "string.max": "Password confirmation cannot be more than {#limit} characters long",
      "any.required": "Password confirmation is required",
    }),
  }).options({ abortEarly: false });
  return schema;
};
