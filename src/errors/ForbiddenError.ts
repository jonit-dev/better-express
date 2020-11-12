import { HttpStatusCode } from '../types/express.types';
import { ApplicationError } from './ApplicationError';

export class ForbiddenError extends ApplicationError {
  constructor(message) {
    super(message, HttpStatusCode.Forbidden);

    this.error = ForbiddenError.name;
  }
}
