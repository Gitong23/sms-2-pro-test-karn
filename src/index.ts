import express from 'express';
import connectDB from './db/connection';
import config from './config';
import router from './router';
import { errorHandler } from './middleware/error.midleware';

connectDB();

const app = express();

//middleware before handler
app.use(express.json());

app.use('/', router());

//middleware after handler
app.use(errorHandler);

const PORT = config.http.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
