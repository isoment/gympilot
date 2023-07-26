import Joi from "joi";

export const postLogin = (request: any) => {
  const schema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  });
  return schema.validate(request);
};

export const postRegister = (request: any) => {
  const schema = Joi.object({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().min(5).max(255).required(),
    password_verify: Joi.string().min(5).max(255).required().valid(Joi.ref("password")),
  });
  return schema.validate(request);
};
