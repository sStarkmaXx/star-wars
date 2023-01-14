import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IHeroesResponse } from './types/heroesTypes';
import { IPlanet } from './types/planetsTypes';

export const heroesApi = createApi({
  reducerPath: 'heroes/api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://swapi.dev/api/',
  }),
  endpoints: (build) => ({
    getHeroes: build.query<IHeroesResponse, number>({
      query: (pageNumber: number) => ({
        url: `people/`,
        params: { page: pageNumber },
      }),
    }),
    getPlanet: build.query<IPlanet, string>({
      query: (planetNumber: string) => ({
        url: `planets/${planetNumber}`,
      }),
    }),
  }),
});

export const { useGetHeroesQuery, useGetPlanetQuery } = heroesApi;
