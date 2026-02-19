import express, { type Request, type Response } from 'express';
import { vigenereHelper } from './helper/vigenereHelper.js';

const cipherRouter = express.Router();

cipherRouter.post('/encode', async (req: Request, res: Response) => {
  vigenereHelper(req.body, 'cipher', res);
});

cipherRouter.post('/decode', async (req: Request, res: Response) => {
  vigenereHelper(req.body, 'decipher', res);
});

export default cipherRouter;
