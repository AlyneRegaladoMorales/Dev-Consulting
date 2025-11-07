import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Comment } from "../model/Comment";

export const commentApi = createApi({
    reducerPath: "commentApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://dev-back-ibkq.onrender.com/api/comments" }),
    tagTypes: ["Comments"],
    endpoints: (builder) => ({
        createComment: builder.mutation<Comment, Partial<Comment>>({
            query: (comment) => ({
                url: "",
                method: "POST",
                body: comment,
            }),
            invalidatesTags: (_, __, { characterId }) => [
                { type: "Comments", id: `LIST-${characterId}` },
            ],
        }),
        getCommentsByPersonId: builder.query<Comment[], number>({
            query: (characterId) => `/character/${characterId}`,
            providesTags: (_, __, characterId) => [
            { type: "Comments", id: `LIST-${characterId}` },
      ],
        }),
    }),
});

export const { useCreateCommentMutation, useGetCommentsByPersonIdQuery } = commentApi;