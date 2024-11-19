import { Request, Response, NextFunction } from "express";
import authService from "../services/auth.service";
import { z } from "zod";
import { validate } from "../utils/validation";

const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

const registerSchema = z.object({
  username: z.string().min(4, "Username must be at least 4 characters long"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

// Infer the schema type
// type RegisterSchema = z.infer<typeof registerSchema>;

const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validateData = validate(registerSchema, req.body);
    const { username, password } = validateData;
    const result = await authService.register(username, password);
    res.status(201).json(result);
  } catch (error) {
    if (error instanceof Error) next(error);
  }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validateData = validate(loginSchema, req.body);
    const { username, password } = validateData;
    const result = await authService.login(username, password);
    res.json(result);
  } catch (error) {
    if (error instanceof Error) next(error);
  }
};

export { register, login };
