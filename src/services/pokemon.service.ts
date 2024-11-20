import Pokemon, { IPokemon } from "../models/pokemon.model";
import { redisClient } from "../db/redis";
import logger from "../utils/logger";

//temp test
const REDIS_TTL = 5; // cache for 10 minute

interface IPokemonService {
  getByName(name: string): Promise<IPokemon | null>;
  getAbilitiesByName(name: string): Promise<{ name: string; hidden: boolean }[] | null>;
  getRandom(): Promise<IPokemon | null>;
}

class PokemonService implements IPokemonService {

  private async getPokemonCache(name: string): Promise<IPokemon | null> {
    const cacheKey = `pokemon:${name.toLowerCase()}`;
    const cachedData = await redisClient?.get(cacheKey);
    if (cachedData) {
      logger.info(`Cache hit for Pokémon: ${name}`);
      return JSON.parse(cachedData);
    }

    logger.info(`Cache miss for Pokémon: ${name}`);
    //fetch from db on cache miss
    const pokemon = await Pokemon.findOne({ name: { $regex: new RegExp(`^${name}$`, "i") } });
    if (!pokemon) {
      return null;
    }

    //write cache
    await redisClient?.set(cacheKey, JSON.stringify(pokemon), { EX: REDIS_TTL });
    return pokemon;
  }

  async getByName(name: string): Promise<IPokemon | null> {
    return this.getPokemonCache(name);
  }

  async getAbilitiesByName(name: string): Promise<{ name: string; hidden: boolean }[] | null> {
    const pokemon = await this.getPokemonCache(name);
    return pokemon?.abilities || null;
  }

  async getRandom(): Promise<IPokemon | null> {
    const total = await Pokemon.countDocuments();
    if(total === 0) return null;

    const randomIdx = Math.floor(Math.random() * total);
    const randomName = await Pokemon.findOne({}, { name: 1 }).skip(randomIdx);

    if (!randomName) return null;
    
    return this.getPokemonCache(randomName.name);
  }
}

export default new PokemonService();
