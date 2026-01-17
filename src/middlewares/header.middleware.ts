import { Request, Response, NextFunction } from 'express';
import { NotAcceptableError } from '../errors/AppError';

export const validateAcceptHeader = (req: Request, _: Response, next: NextFunction) => {
  const acceptHeader = req.headers['accept'];

  if (acceptHeader !== 'application/json') {
    throw new NotAcceptableError('Accept header must be application/json');
  }

  next();
};
