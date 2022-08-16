import { Request, Response, NextFunction } from 'express';
import {
  CustomError,
  CustomRequest,
  CreditDTO,
  QueueDTO,
  UserParams,
} from '../src/types/types';

export function asyncWrap(
  asyncController: (req: Request, res: Response) => Promise<Response | void>
) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await asyncController(req, res);
    } catch (err: unknown) {
      const error = err as CustomError;
      res.status(error.statusCode || 400).json({ message: error.message });
      next(error);
    }
  };
}

export function asyncWrapCredit(
  asyncController: (
    req: Request<
      UserParams,
      Record<string, unknown>,
      CreditDTO,
      Record<string, unknown>
    >,
    res: Response
  ) => Promise<Response | void>
) {
  return async (
    req: Request<
      UserParams,
      Record<string, unknown>,
      CreditDTO,
      Record<string, unknown>
    >,
    res: Response,
    next: NextFunction
  ) => {
    try {
      await asyncController(req, res);
    } catch (err: unknown) {
      const error = err as CustomError;
      res.status(error.statusCode || 400).json({ message: error.message });
      next(error);
    }
  };
}

export function asyncWrapQueue(
  asyncController: (
    req: CustomRequest<QueueDTO>,
    res: Response
  ) => Promise<Response | void>
) {
  return async (
    req: CustomRequest<QueueDTO>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      await asyncController(req, res);
    } catch (err: unknown) {
      const error = err as CustomError;
      res.status(error.statusCode || 400).json({ message: error.message });
      next(error);
    }
  };
}
