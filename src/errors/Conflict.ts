import { HttpStatusCode } from "../types/express.types";
import { ApplicationError } from "./ApplicationError";

export class Conflict extends ApplicationError {
  constructor(message) {
    super(message, HttpStatusCode.Conflict);

    this.error = Conflict.name;
  }
}
