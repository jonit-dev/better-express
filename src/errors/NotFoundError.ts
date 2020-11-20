import { HttpStatusCode } from "../types/express.types";
import { ApplicationError } from "./ApplicationError";

export class NotFoundError extends ApplicationError {
  constructor(message) {
    super(message, HttpStatusCode.NotFound);

    this.error = NotFoundError.name;
  }
}
