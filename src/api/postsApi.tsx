import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Character, CharacterResponse } from "../model/Character";


export const dbzApi = createApi({
  reducerPath: "dbzApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://dragonball-api.com/api/" }),
  endpoints: (builder) => ({
    getCharacters: builder.query<CharacterResponse, number | void>({
      query: (page = 1) => `characters?page=${page}&limit=10`,
    }),
    getCharacterById: builder.query<Character, number>({
      query: (id) => `characters/${id}`,
    }),
    searchCharacters: builder.query<Character[], string>({
        query: (name) => `characters?name=${name}`,
    }),
    getCharactersByGender: builder.query<CharacterResponse, string>({
      query: (gender) => `characters?gender=${gender}`,
    }),
    getCharactersByRace: builder.query<CharacterResponse, string>({
      query: (race) => `characters?race=${race}`,
    }),
    getCharactersByAffiliation: builder.query<CharacterResponse, string>({
      query: (affiliation) => `characters?affiliation=${affiliation}`,
    }),
  }),
});

export const { 
  useGetCharactersQuery, 
  useGetCharacterByIdQuery, 
  useSearchCharactersQuery, 
  useGetCharactersByGenderQuery,
  useGetCharactersByRaceQuery,
  useGetCharactersByAffiliationQuery,
} = dbzApi;
