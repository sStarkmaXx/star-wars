import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IHeroesResponse, IHero } from './types/heroesTypes';
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
    searchHero: build.query<IHeroesResponse, string>({
      query: (heroName: string) => ({
        url: `people/`,
        params: { search: heroName },
      }),
    }),
  }),
});

export const { useGetHeroesQuery, useGetPlanetQuery, useLazySearchHeroQuery } =
  heroesApi;
