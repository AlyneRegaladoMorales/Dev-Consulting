import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Comment } from "../model/Comment";

export const commentApi = createApi({
    reducerPath: "commentApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8081/api/comments" }),
    tagTypes: ["Comments"],
    endpoints: (builder) => ({
        createComment: builder.mutation<Comment, Partial<Comment>>({
            query: (comment) => ({
                url: "",
                method: "POST",
                body: comment,
            }),
            invalidatesTags: (result, error, { characterId }) => [
                { type: "Comments", id: `LIST-${characterId}` },
            ],
        }),
        getCommentsByPersonId: builder.query<Comment[], number>({
            query: (characterId) => `/character/${characterId}`,
            providesTags: (result, error, characterId) => [
            { type: "Comments", id: `LIST-${characterId}` },
      ],
        }),
    }),
});

export const { useCreateCommentMutation, useGetCommentsByPersonIdQuery } = commentApi;