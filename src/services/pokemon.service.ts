import { count } from "console";
import Pokemon, { IPokemon } from "../models/pokemon.model";

interface IPokemonService {
  getByName(name: string): Promise<IPokemon | null>;
}

class PokemonService implements IPokemonService {
  async getByName(name: string): Promise<IPokemon | null> {
    return Pokemon.findOne({ name: { $regex: new RegExp(`^${name}$`, "i") } });
  }

  async getAbilitiesByName(name: string): Promise<{ name: string; hidden: boolean }[] | null> {
    const pokemon = await Pokemon.findOne(
      { name: { $regex: new RegExp(`^${name}$`, 'i') } },
      { abilities: 1, _id: 0 }
    );

    return pokemon?.abilities || null;
  }

  async getRandom(): Promise<IPokemon | null> {
    const total = await Pokemon.countDocuments();
    if(total === 0) return null;

    const randomIdx = Math.floor(Math.random() * total);
    return Pokemon.findOne().skip(randomIdx);
  }
}

export default new PokemonService();
