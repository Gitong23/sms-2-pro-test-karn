import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import config from '../config';

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  let token = req.headers.authorization;

  if (!token) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  if(token.startsWith('Bearer ')) {
    token = token.split(' ')[1];
  }

  try {
    jwt.verify(token, config.jwt.secret!);
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};
