import express from 'express';
import connectDB from './db/connection';
import config from './config';
import router from './router';

connectDB();

const app = express();

app.use(express.json());
app.use('/', router());

const PORT = config.http.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
