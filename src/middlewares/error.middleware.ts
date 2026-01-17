import { Request, Response, NextFunction } from 'express';
import { AppError, BadRequestError, NotFoundError, GitHubApiError, GitHubRateLimitError } from '../errors/AppError';

export interface ApiResponse<T> {
  status: number;
  data?: T;
  message?: string;
  errors?: unknown;
}

/**
 * Global Error Handler
 * Identifies error types and formats the response accordingly.
 */
export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  let status = 500;
  let message = 'Internal Server Error';
  let errors: unknown = undefined;

  if (err instanceof AppError) {
    status = err.status;
    message = err.message;
    errors = err.errors;
  } else if (err instanceof Error) {
    message = err.message;
  }

  const response: ApiResponse<null> = {
    status,
    message,
    ...(typeof errors === 'object' && errors && { errors })
  };

  res.status(status).json(response);
};
