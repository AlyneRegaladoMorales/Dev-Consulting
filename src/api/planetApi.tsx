import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Planet } from "../model/Planet";

export const planetApi = createApi({
  reducerPath: "planetApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://dragonball-api.com/api/" }),
  endpoints: (builder) => ({
    getPlanets: builder.query<Planet[], void>({
      query: () => `planets?limit=20`,
    }),

    getPlanetsById: builder.query<Planet, number>({
      query: (id) => `planets/${id}`,
    }),

    getPlanetsByIsDestroyed: builder.query<Planet[], boolean>({
      query: (isDestroyed) => `planets?isDestroyed=${isDestroyed}`,
    }),
   
  }),
});

export const {
    useGetPlanetsQuery,
    useGetPlanetsByIdQuery, 
    useGetPlanetsByIsDestroyedQuery 
} = planetApi;   