import express, { type Express, type Request, type Response } from 'express';
import { PORT } from './constants/constants.js';
import cors from 'cors';
import cipherRouter from './routes/cipher.routes.js';

const app: Express = express();

app.use(express.json());
app.use(cors());
app.use('/', cipherRouter);

app.use((req: Request, res: Response) => {
  res.status(404).send({ error: 'not found' });
});

const run = () => {
  app.listen(PORT, () => {
    console.log(`Server: ${PORT}`);
  });
};

run();
