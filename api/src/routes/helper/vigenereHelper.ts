import Caesar from 'caesar-salad';
import type { ICipher } from '../../types/cipher/cipher.type.js';
import { validateData } from '../../utils/validateData.js';
import { type Response } from 'express';

export const vigenereHelper = async (
  data: ICipher,
  type: 'cipher' | 'decipher',
  res: Response,
) => {
  const vigenerData: ICipher = {
    message: data.message,
    password: data.password,
  };
  const isValidateData = validateData(data, vigenerData);

  if (isValidateData) {
    if (type === 'cipher') {
      const encodedMessage = Caesar.Vigenere.Cipher(vigenerData.password).crypt(
        vigenerData.message,
      );

      return res.json({ encoded: encodedMessage });
    } else if (type === 'decipher') {
      const decodedMessage: string = Caesar.Vigenere.Decipher(
        vigenerData.password,
      ).crypt(vigenerData.message);

      return res.json({ decoded: decodedMessage });
    }
  } else {
    return res.status(400).json({
      error: `please enter your ${Object.keys(vigenerData).join(', ')}`,
    });
  }
};
