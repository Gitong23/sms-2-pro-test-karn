import { Request, Response } from "express";
import authService from "../services/auth.service";

const register = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const result = await authService.register(username, password);
    res.status(201).json(result);
  } catch (error) {
    if (error instanceof Error)
      res.status(400).json({ message: error.message });
  }
};

const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const result = await authService.login(username, password);
    res.json(result);
  } catch (error) {
    if (error instanceof Error)
      res.status(401).json({ message: error.message });
  }
};

export { register, login };
