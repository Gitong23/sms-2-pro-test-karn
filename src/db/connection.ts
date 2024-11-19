import mongoose from 'mongoose';
import config from '../config';

const connectDB = async (): Promise<void> => {
  try {
    const connection = await mongoose.connect(config.mongoDB.uri!);
    console.log(`MongoDB connected: ${connection.connection.host}`);
  } catch (error) {
    console.error(`Error: ${(error as Error).message}`);
    process.exit(1);
  }
};

export default connectDB;
