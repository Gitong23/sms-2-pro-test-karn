import express from 'express';
import connectDB from './db/connection';
import config from './config';
import router from './router';
import { errorHandler } from './middleware/error.midleware';
import requestLogger from './middleware/logger.middleware';
import { initRedis } from './db/redis';

const app = express();

//middleware before handler
app.use(express.json());
app.use(requestLogger);

app.use('/', router);

//middleware after handler
app.use(errorHandler);

const PORT = config.http.PORT;

(async () => {
  try {
    await connectDB();
    await initRedis();

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start the server:', err);
    process.exit(1);
  }
})();
