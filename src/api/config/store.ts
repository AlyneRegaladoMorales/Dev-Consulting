import { configureStore } from "@reduxjs/toolkit";
import { dbzApi } from "../postsApi";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { commentApi } from "../commentApi";

export const store = configureStore({
  reducer: {
    [dbzApi.reducerPath]: dbzApi.reducer,
    [commentApi.reducerPath]: commentApi.reducer,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware()
  .concat(dbzApi.middleware)
  .concat(commentApi.middleware),
});

setupListeners(store.dispatch)


