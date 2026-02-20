import Caesar from 'caesar-salad';
import type { ICipher } from '../../types/cipher/cipher.type.js';
import { type Response } from 'express';
import cipherFileDb from '../../repositories/cipher.repository.js';

export const vigenereHelper = async (
  data: ICipher,
  type: 'cipher' | 'decipher',
  res: Response,
) => {
  if (!data.message || !data.password) {
    return res.status(400).json({
      error: 'Message and password required',
    });
  }

  if (type === 'cipher') {
    const encodedMessage = Caesar.Vigenere.Cipher(data.password).crypt(
      data.message,
    );

    await cipherFileDb.addCipher(encodedMessage, data.password);

    return res.json({ encoded: encodedMessage });
  }

  if (type === 'decipher') {
    const found = await cipherFileDb.findCipher(data.message);

    if (!found) {
      return res.status(404).json({
        error: 'Cipher not found',
      });
    }

    if (found.password !== data.password) {
      return res.status(403).json({
        error: 'Wrong password',
      });
    }

    const decodedMessage = Caesar.Vigenere.Decipher(
      data.password,
    ).crypt(data.message);

    return res.json({ decoded: decodedMessage });
  }
};