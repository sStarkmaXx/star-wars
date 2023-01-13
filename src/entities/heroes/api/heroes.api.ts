import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ServerResponse } from '../model/heroesModel';

export const heroesApi = createApi({
  reducerPath: 'heroes/api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://swapi.dev/api/',
  }),
  endpoints: (build) => ({
    getHeroes: build.query<ServerResponse, number>({
      query: (pageNumber: number) => ({
        url: `people/`,
        params: { page: pageNumber },
      }),
    }),
  }),
});

export const { useGetHeroesQuery } = heroesApi;
