import { HttpStatusCode } from "../types/express.types";
import { ApplicationError } from "./ApplicationError";

export class BadRequestError extends ApplicationError {
  constructor(message) {
    super(message, HttpStatusCode.BadRequest);

    this.error = BadRequestError.name;
  }
}
