import { HttpStatusCode } from '../types/express.types';
import { ApplicationError } from './ApplicationError';

export class InternalServerError extends ApplicationError {
  constructor(message) {
    super(message, HttpStatusCode.BadRequest);

    this.error = InternalServerError.name;
  }
}
