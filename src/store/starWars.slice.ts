import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IHero } from './api/types/heroesTypes';

type StarWarsState = {
  favouritesHeroes: IHero[];
};

export const FVH = 'favouritesHeroes';

const initialState: StarWarsState = {
  favouritesHeroes: JSON.parse(localStorage.getItem(FVH) ?? '[]'),
};

export const starWarsSlice = createSlice({
  name: 'starWars',
  initialState,
  reducers: {
    addFavouritesHeroes(state, action: PayloadAction<IHero>) {
      state.favouritesHeroes.push(action.payload);
      localStorage.setItem(
        'favouritesHeroes',
        JSON.stringify(state.favouritesHeroes)
      );
    },
    delFavouritesHeroes(state, action: PayloadAction<IHero>) {
      state.favouritesHeroes = state.favouritesHeroes.filter(
        (hero) => hero.name !== action.payload.name
      );
      localStorage.setItem(FVH, JSON.stringify(state.favouritesHeroes));
    },
  },
});

export const starWarsActions = starWarsSlice.actions;
export const starWarsReducer = starWarsSlice.reducer;
