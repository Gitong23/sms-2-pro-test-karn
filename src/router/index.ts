import express from "express";
import authRouter from "./auth.router";
import pokemonRouter from "./pokemon.router";
const router = express.Router();

router.use('/api/v2/', authRouter);
router.use('/api/v2/pokemon', pokemonRouter);

export default router;