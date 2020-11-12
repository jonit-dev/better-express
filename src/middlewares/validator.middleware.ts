import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";

import { BadRequest } from "../errors/BadRequest";
import { IValidationError } from "../types/validation.types";

export const DTOValidator = (dtoClass: any) => {
  return function (req: Request, res: Response, next: NextFunction): any {
    const output = plainToClass(dtoClass, req.body);

    validate(output, { skipMissingProperties: true }).then(
      (errors: IValidationError[]) => {
        // errors is an array of validation errors
        if (errors.length > 0) {
          const errorList: string[] = [];
          for (const validationError of errors) {
            console.log(validationError);

            const constraintsKv = Object.entries(
              validationError.constraints!
            ).map(([key, value]) => ({ key, value }));

            for (const item of constraintsKv) {
              errorList.push(item.value);
            }
          }
          return res.send(new BadRequest(errorList));
        } else {
          res.locals.input = output;
          next();
        }
      }
    );
  };
};
