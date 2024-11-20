import express from "express";
import authRouter from "./auth.router";
import pokemonRouter from "./pokemon.router";
import { authMiddleware } from "../middleware/auth.middleware";

const router = express.Router();

//public routes
router.use('/api/v2/', authRouter);

//protected routes
router.use('/api/v2/pokemon', authMiddleware, pokemonRouter);

export default router;