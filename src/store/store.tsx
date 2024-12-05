import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './slices/auth-slice';
import { accommodationReducer } from './slices/accommodation-slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    accommodation: accommodationReducer,
  },
});

export type StoreState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
