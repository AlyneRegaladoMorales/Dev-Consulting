import { configureStore } from "@reduxjs/toolkit";
import { dbzApi } from "../postsApi";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { commentApi } from "../commentApi";
import { customCharacter } from "../customCharacter";

export const store = configureStore({
  reducer: {
    [dbzApi.reducerPath]: dbzApi.reducer,
    [commentApi.reducerPath]: commentApi.reducer,
    [customCharacter.reducerPath]: customCharacter.reducer,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware()
      .concat(dbzApi.middleware)
      .concat(commentApi.middleware)
      .concat(customCharacter.middleware),
});

setupListeners(store.dispatch)


