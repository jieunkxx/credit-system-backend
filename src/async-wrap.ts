import { Request, Response, NextFunction } from 'express';
import { CustomError } from './common/types';

// eslint-disable-next-line no-unused-vars
function asyncWrap(asyncController: (req: Request, res: Response) => void) {
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

export default asyncWrap;
