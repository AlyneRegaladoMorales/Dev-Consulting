import { configureStore } from "@reduxjs/toolkit";
import { dbzApi } from "../postsApi";
import { setupListeners } from "@reduxjs/toolkit/query/react";

export const store = configureStore({
  reducer: {
    [dbzApi.reducerPath]: dbzApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(dbzApi.middleware),
});

setupListeners(store.dispatch)


