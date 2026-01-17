import { Response } from 'express';

declare module 'express-serve-static-core' {
  interface Response {
    success<T>(data: T, status?: number): void;
  }
}
