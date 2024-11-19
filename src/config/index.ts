import * as dotenv from "dotenv";
dotenv.config();

const mongoDB = {
  uri: process.env.MONGO_URI || '',
};

const jwt = {
  secret: process.env.JWT_SECRET || '',
  expiresIn: process.env.JWT_EXPIRES_IN || '',
};

const http = {
  PORT: process.env.PORT || 3000,
};

const config = {
  http,
  mongoDB,
  jwt,
};

export default config;
