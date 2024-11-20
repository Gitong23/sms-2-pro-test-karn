import express from 'express';
import { getPokemonByName, getPokemonAbilities, getRandomPokemon } from '../controller/pokemon.controller';

const pokemonRouter = express.Router();

pokemonRouter.get('/random', getRandomPokemon);
pokemonRouter.get('/:name', getPokemonByName);
pokemonRouter.get('/:name/ability', getPokemonAbilities);

export default pokemonRouter;
