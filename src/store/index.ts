import { configureStore } from '@reduxjs/toolkit';
import { heroesApi } from '../api/starWars.api';

export const store = configureStore({
  reducer: {
    [heroesApi.reducerPath]: heroesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(heroesApi.middleware),
});
