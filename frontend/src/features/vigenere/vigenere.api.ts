import { createAsyncThunk } from '@reduxjs/toolkit';
import type {
  IDecodedMessage,
  IEncodedMessage,
  IVigenere,
} from '../../types/vigenere/vigenere.type';
import { axiosApi } from '../../api/axiosApi';

export const postMessageEncode = createAsyncThunk<IEncodedMessage, IVigenere>(
  'message/postMessageEncode',
  async (vigenere) => {
    const response = await axiosApi.post('/encode', vigenere);
    const data = response.data;

    return data;
  },
);

export const postMessageDecode = createAsyncThunk<IDecodedMessage, IVigenere>(
  'message/postMessageDecode',
  async (vigenere) => {
    const response = await axiosApi.post('/decode', vigenere);
    const data = response.data;

    return data;
  },
);
