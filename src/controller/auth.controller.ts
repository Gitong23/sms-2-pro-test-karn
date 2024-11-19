import { Request, Response, NextFunction } from "express";
import authService from "../services/auth.service";

const register = async (req: Request, res: Response, next: NextFunction) => {
  const { username, password } = req.body;

  try {
    const result = await authService.register(username, password);
    res.status(201).json(result);
  } catch (error) {
    if (error instanceof Error) next(error);
  }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  const { username, password } = req.body;

  try {
    const result = await authService.login(username, password);
    res.json(result);
  } catch (error) {
    if (error instanceof Error) next(error);
  }
};

export { register, login };
