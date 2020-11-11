import { HttpStatusCode } from "../types/express.types";
import { ApplicationError } from "./ApplicationError";

export class BadRequest extends ApplicationError {
  constructor(message) {
    super(message, HttpStatusCode.BadRequest);
  }
}
