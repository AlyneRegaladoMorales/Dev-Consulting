import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { CustomCharacter } from "../model/Character";

export const customCharacter = createApi({
    reducerPath: "charactersApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://dev-back-ibkq.onrender.com/api/" }),
  tagTypes: ["Character"],
  endpoints: (builder) => ({
    getCustomCharacters: builder.query<CustomCharacter[], void>({
      query: () => "characters",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Character" as const, id })),
              { type: "Character", id: "LIST" },
            ]
          : [{ type: "Character", id: "LIST" }],
    }),
    getCustomCharacterById: builder.query<CustomCharacter, number>({
      query: (id) => `characters/${id}`,
      providesTags: (result, error, id) => [
        { type: "Character", id }
      ],
    }),
    addCustomCharacter: builder.mutation<CustomCharacter, Partial<CustomCharacter>>({
      query: (character) => ({
        url: "characters",
        method: "POST",
        body: character,
      }),
      invalidatesTags: ["Character"],
    }),
    updateCustomCharacter: builder.mutation<CustomCharacter, { id: number; data: CustomCharacter }>({
      query: ({ id, data }) => ({
        url: `characters/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Character", id },
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