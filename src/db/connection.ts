import mongoose from 'mongoose';
import config from '../config';
import Pokemon from '../models/pokemon.model';
import { pokemons } from './mockData';
import logger from '../utils/logger';

const seedPokemons = async (): Promise<void> => {
  
  const db = mongoose.connection.db;

  if (!db) {
    throw new Error('Database connection is not ready.');
  }

  const collections = await db.listCollections({ name: 'pokemons' }).toArray();

  if (collections.length > 0) {
    logger.info('Pokemons collection already exists. Skipping seeding.');
    return;
  }

  logger.info('Pokemons collection not found. Seeding data...');

  await Pokemon.insertMany(pokemons);
  logger.info('Pokemons seeded successfully.');
};

const connectDB = async (): Promise<void> => {
  try {
    const connection = await mongoose.connect(config.mongoDB.uri!,{
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      maxPoolSize: 50,
      minPoolSize: 5,
    });
    logger.info(`MongoDB connected: ${connection.connection.host}`);

    await seedPokemons();
  } catch (error) {
    logger.error(`Error connecting to MongoDB: ${(error as Error).message}`);
    process.exit(1);
  }
};

export default connectDB;
