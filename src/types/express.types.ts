import { Request } from "express";

import { IUser } from "../models/user/user.model";

export interface IRequestCustom extends Request {
  body: {
    [key: string]: string | undefined;
  };
  user?: IUser;
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

export interface IServerBootstrapVars {
  appName: string;
  timezone: string;
  adminEmail: string;
  language: string;
  phoneLocale: string;
  port: string | number;
}
