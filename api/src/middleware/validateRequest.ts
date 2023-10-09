import { NextFunction, Request, Response } from "express";
import Joi from "joi";

// A function the returns a Joi schema
type JoiSchemaFunction<T> = () => Joi.ObjectSchema<T>;

/**
 *  This middleware will accept a function that returns a Joi schema. We call the function
 *  to get the Joi schema and then call validate() passing in the request body. If there
 *  are validation errors we want to format them nicely and return them in a response.
 *  If there are no errors we call next().
 */
export default <T>(joiSchema: JoiSchemaFunction<T>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const validateRequest: Joi.ValidationResult<T> = joiSchema().validate(req.body);

    if (validateRequest.error) {
      const errors: Record<string, string> = {};

      validateRequest.error.details.forEach((err: Joi.ValidationErrorItem) => {
        const fieldName = err.path[0];
        const errorMessage = `${err.message.replace(/"/g, "")}`;
        const value = errorMessage.replace(/_/g, " ");
        const capitalizedMessage = value.charAt(0).toUpperCase() + value.slice(1);
        errors[fieldName] = capitalizedMessage;
      });

      return res.status(422).json({ errors });
    }

    next();
  };
};
