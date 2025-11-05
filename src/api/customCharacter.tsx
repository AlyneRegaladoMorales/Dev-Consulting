import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Character } from "../model/Character";

export const customCharacter = createApi({
    reducerPath: "charactersApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8081/api/" }),
  tagTypes: ["Character"],
  endpoints: (builder) => ({
    getCustomCharacters: builder.query<Character[], void>({
      query: () => "characters",
      providesTags: ["Character"],
    }),
    getCustomCharacterById: builder.query<Character, number>({
      query: (id) => `characters/${id}`,
    }),
    addCustomCharacter: builder.mutation<Character, Partial<Character>>({
      query: (character) => ({
        url: "characters",
        method: "POST",
        body: character,
      }),
      invalidatesTags: ["Character"],
    }),
    updateCustomCharacter: builder.mutation<Character, { id: number; data: Character }>({
      query: ({ id, data }) => ({
        url: `characters/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Character", id },
        "Character",
      ],
    }),
    deleteCustomCharacter: builder.mutation<void, number>({
      query: (id) => ({
        url: `characters/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Character"],
    }),
  }),
})
export const { 
    useGetCustomCharactersQuery, 
    useGetCustomCharacterByIdQuery, 
    useAddCustomCharacterMutation, 
    useUpdateCustomCharacterMutation, 
    useDeleteCustomCharacterMutation 
} = customCharacter;