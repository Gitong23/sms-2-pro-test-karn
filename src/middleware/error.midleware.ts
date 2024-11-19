import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction): void => {

  const statusCode = err.status || 500;
  const message = err.message || 'Internal Server Error';

  logger.error(`${req.method} ${req.url} - ${message} - ${err.stack}`);

  res.status(statusCode).json({
    message,
    // error: process.env.NODE_ENV === 'production' ? undefined : err.stack,
  });
};
