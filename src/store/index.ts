import { configureStore } from '@reduxjs/toolkit';
import { heroesApi } from './api/starWars.api';
import { starWarsReducer } from './starWars.slice';

export const store = configureStore({
  reducer: {
    [heroesApi.reducerPath]: heroesApi.reducer,
    favouritesHeroes: starWarsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(heroesApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
