import { RequestHandler } from 'express';
import PokemonService from '../services/pokemon.service';

const getPokemonByName: RequestHandler = async (req, res, next) => {
  try {
    const { name } = req.params;
    const pokemon = await PokemonService.getByName(name);
    if (!pokemon) {
      res.status(404).json({ success: false, message: `Pokemon with name "${name}" not found` });
      return;
    }
    res.json({ success: true, data: pokemon });
  } catch (error) {
    next(error); 
  }
};

const getPokemonAbilities: RequestHandler = async (req, res, next) => {
  try {
    const { name } = req.params;
    const abilities = await PokemonService.getAbilitiesByName(name);
    if (!abilities) {
      res.status(404).json({ success: false, message: `Abilities for Pokemon "${name}" not found` });
      return;
    }
    res.json({ success: true, data: abilities });
  } catch (error) {
    next(error);
  }
};

// Get a random Pokémon
const getRandomPokemon: RequestHandler = async (req, res, next) => {
  try {
    const pokemon = await PokemonService.getRandom();
    if (!pokemon) {
      res.status(404).json({ success: false, message: 'No Pokémon found in the database' });
      return;
    }
    res.json({ success: true, data: pokemon });
  } catch (error) {
    next(error);
  }
};

export { getPokemonByName, getPokemonAbilities, getRandomPokemon };