import { configureStore } from '@reduxjs/toolkit';
import { vigenereReducer } from '../features/vigenere/vigenere.slice';

export const store = configureStore({
  reducer: {
    vigenereReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
