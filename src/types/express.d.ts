import { ApiResponse } from '../middlewares/error.middleware';

declare global {
  namespace Express {
    interface Response {
      success<T>(data: T, status?: number): void;
    }
  }
}
