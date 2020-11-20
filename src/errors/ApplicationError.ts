export class ApplicationError extends Error {
  public statusCode: number;
  public error: string;
  constructor(message, statusCode: number) {
    super();

    Error.captureStackTrace(this, this.constructor);

    this.message = message || "Something went wrong. Please try again.";

    this.statusCode = statusCode || 500;
  }
}
