import { Router } from 'express';

export abstract class PathRouter {
  constructor(readonly path: string, readonly router: Router) {}
}

export class CustomError extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, CustomError.prototype);
  }

  getErrorMessage() {
    return 'Something went wrong: ' + this.message;
  }
}
