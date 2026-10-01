import { configureStore } from '@reduxjs/toolkit';
import rtsReducer from './rtsSlice';

export const store = configureStore({
  reducer: {
    rts: rtsReducer,
  },
});
