import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/ApiError.js';

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  // custom error
  if (err instanceof ApiError) {
    return res.json({
      success: false,
      message: err.message,
    });
  }

  // default error
  return res.json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
};