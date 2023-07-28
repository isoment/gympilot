import express, { NextFunction, Request, Response } from "express";
import Joi from "joi";

type RequestSchemaFunction<T> = () => Joi.ObjectSchema<T>;

/**
 *  This middleware will accept a function that we pass the request body into. The request
 *  function returns the Joi.ValidationResult object type which we process and return as a
 *  json response with a 422 status if there are any errors.
 */
export default <T>(requestSchema: RequestSchemaFunction<T>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const validateRequest: Joi.ValidationResult<T> = requestSchema().validate(req.body);

    if (validateRequest.error) {
      const errors: Record<string, string> = {};

      validateRequest.error.details.forEach((err: Joi.ValidationErrorItem) => {
        const fieldName = err.path[0];
        const errorMessage = `${err.message.replace(/"/g, "")}`;
        const value = errorMessage.replace(/_/g, " ");
        errors[fieldName] = value;
      });

      return res.status(422).json(errors);
    }

    next();
  };
};
