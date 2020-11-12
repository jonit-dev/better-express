import { HttpStatusCode } from '../types/express.types';
import { ApplicationError } from './ApplicationError';

export class ConflictError extends ApplicationError {
  constructor(message) {
    super(message, HttpStatusCode.Conflict);

    this.error = ConflictError.name;
  }
}
