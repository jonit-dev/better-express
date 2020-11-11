import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";

export const DTOValidator = (dtoClass: any) => {
  return function (req: Request, res: Response, next: NextFunction): any {
    const output: any = plainToClass(dtoClass, req.body);
    validate(output, { skipMissingProperties: true }).then((errors) => {
      // errors is an array of validation errors
      if (errors.length > 0) {
        console.log(errors);
        // eslint-disable-next-line no-array-constructor
        let errorTexts = Array();
        for (const errorItem of errors) {
          errorTexts = errorTexts.concat(errorItem.constraints);
        }
        return res.status(400).send(errorTexts);
      } else {
        res.locals.input = output;
        next();
      }
    });
  };
};
