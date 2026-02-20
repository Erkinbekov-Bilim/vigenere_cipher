import { createSlice } from '@reduxjs/toolkit';
import { postMessageDecode, postMessageEncode } from './vigenere.api';
import type {
  IDecodedMessage,
  IEncodedMessage,
} from '../../types/vigenere/vigenere.type';

export interface IVigenereState {
  encodeMessage: IEncodedMessage | null;
  decodeMessage: IDecodedMessage | null;
  isError: boolean;
}

const initialState: IVigenereState = {
  encodeMessage: null,
  decodeMessage: null,
  isError: false,
};

export const vigenereSlice = createSlice({
  name: 'vigenere',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(postMessageEncode.pending, (state) => {
      state.isError = false;
    });
    builder.addCase(
      postMessageEncode.fulfilled,
      (state, { payload: encode }) => {
        state.isError = false;
        state.encodeMessage = encode;
      },
    );
    builder.addCase(
      postMessageDecode.fulfilled,
      (state, { payload: decoded }) => {
        state.isError = false;
        state.decodeMessage = decoded;
      },
    );
  },
});

export const vigenereReducer = vigenereSlice.reducer;
