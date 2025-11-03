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
  }),
});

export const { useGetCharactersQuery, useGetCharacterByIdQuery } = dbzApi;
