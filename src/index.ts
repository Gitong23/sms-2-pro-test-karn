import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db/connection';
// import { router } from './routes';

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
// app.use(router);

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});