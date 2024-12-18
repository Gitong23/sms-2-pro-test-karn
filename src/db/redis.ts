import { createClient, RedisClientType } from 'redis';
import config from '../config';
import logger from '../utils/logger';

let redisClient: RedisClientType | null = null;

const initRedis = async (): Promise<void> => {
  try {
    // Create the Redis client
    redisClient = createClient({
      url: `redis://${config.redis.host}:${config.redis.port}`,
      socket: {
        connectTimeout: 5000,
      }
    });

    // Redis events
    redisClient.on('connect', () => {
      logger.info('Connected to Redis');
    });

    redisClient.on('error', (err) => {
      logger.error('Redis connection error:', err);

      if (err.code === 'ECONNREFUSED') {
        logger.error('Redis connection refused. Stopping the server.');
        process.exit(1);
      }
    });

    // Connect to Redis
    await redisClient.connect();
    logger.info(`Redis connection established successfully on port: ${config.redis.port}`);
  } catch (error) {
    logger.error('Failed to connect to Redis:', error);
    process.exit(1);
  }
};

export { redisClient, initRedis };
