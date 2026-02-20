import { readFile, writeFile } from 'fs/promises';
import type { ICipher } from '../types/cipher/cipher.type.js';

const fileName = './src/data/ciphers.json';
let data: ICipher[] = [];

const cipherFileDb = {
  async init() {
    try {
      const fileContent = await readFile(fileName);
      data = JSON.parse(fileContent.toString());
    } catch (error) {
      data = [];
    }
  },

  async getAll() {
    return data;
  },

  async addCipher(message: string, password: string) {
    const newCipher: ICipher = {
      message,
      password,
    };

    data.push(newCipher);
    await this.save();

    return newCipher;
  },

  async findCipher(cipherText: string) {
    return data.find((item) => item.message === cipherText);
  },

  async save() {
    return writeFile(fileName, JSON.stringify(data, null, 2));
  },
};

export default cipherFileDb;
