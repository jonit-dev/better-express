import { Request } from 'express';

export interface IRequestWithBody extends Request {
  body: {
    [key: string]: string | undefined;
  };
}

export enum HttpStatusCode {
  OK = 200,
  Created = 201,
  MovedPermanently = 301,
  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  UnprocessableEntity = 422,
  MethodNotAllowed = 405,
  InternalServerError = 500,
  Conflict = 409,
}
