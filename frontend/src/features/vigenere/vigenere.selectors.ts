import type { RootState } from '../../app/store';

export const selectEncodedMessage = (state: RootState) =>
  state.vigenereReducer.encodeMessage;

export const selectDecodedMessage = (state: RootState) =>
  state.vigenereReducer.decodeMessage;
