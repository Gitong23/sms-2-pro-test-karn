import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';
import { ZodError } from 'zod';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction): void => {

  let statusCode;
  let message;
  if (err instanceof ZodError){
    statusCode = 400;
    message = err.errors.map((error) => error.message).join(', ');
  } else {
    statusCode = err.status || 400;
    message = err.message;
  }

  logger.error(`${req.method} ${req.url} - ${message} - ${err.stack}`);

  res.status(statusCode).json({
    success: false,
    message,
  });
};
