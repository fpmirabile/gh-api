import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { BadRequestError } from '../errors/AppError';

/**
 * Middleware de validación:
 * Identifica si hubo errores en el request y lanza el error correspondiente.
 */
export const validate = (req: Request, _: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new BadRequestError('Validation failed', errors.array());
  }

  next();
};
