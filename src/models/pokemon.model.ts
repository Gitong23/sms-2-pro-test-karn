import mongoose, { Schema, Document } from 'mongoose';

export interface IPokemon extends Document {
  name: string; // Name of the Pokémon
  types: string[]; // Pokémon types (e.g., Fire, Water)
  abilities: {
    name: string;
    hidden: boolean;
  }[]; // Abilities with their visibility
  stats: {
    hp: number;
    attack: number;
    defense: number;
    specialAttack: number;
    specialDefense: number;
    speed: number;
  }; // Base stats
  height: number; // Height in decimeters
  weight: number; // Weight in hectograms
  baseExperience: number; // Base experience gained when defeated
  image: string; // URL to the Pokémon's image
  isLegendary: boolean; // Whether the Pokémon is legendary
}

// Define the Pokémon schema
const PokemonSchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
  types: { type: [String], required: true }, // Array of Pokémon types
  abilities: [
    {
      name: { type: String, required: true },
      hidden: { type: Boolean, default: false },
    },
  ],
  stats: {
    hp: { type: Number, required: true },
    attack: { type: Number, required: true },
    defense: { type: Number, required: true },
    specialAttack: { type: Number, required: true },
    specialDefense: { type: Number, required: true },
    speed: { type: Number, required: true },
  },
  height: { type: Number, required: true }, // Height in decimeters
  weight: { type: Number, required: true }, // Weight in hectograms
  baseExperience: { type: Number, required: true }, // Base experience
  image: { type: String, required: true }, // URL to the image
  isLegendary: { type: Boolean, default: false }, // Default to false
});

// Create and export the Pokémon model
export default mongoose.model<IPokemon>('Pokemon', PokemonSchema);
