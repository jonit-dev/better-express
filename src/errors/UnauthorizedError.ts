import { HttpStatusCode } from "../types/express.types";
import { ApplicationError } from "./ApplicationError";

export class UnauthorizedError extends ApplicationError {
  constructor(message) {
    super(message, HttpStatusCode.Unauthorized);

    this.error = UnauthorizedError.name;
  }
}
