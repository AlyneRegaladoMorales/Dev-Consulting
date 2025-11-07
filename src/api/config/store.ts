import { configureStore } from "@reduxjs/toolkit";
import { dbzApi } from "../postsApi";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { commentApi } from "../commentApi";
import { customCharacter } from "../customCharacter";
import { planetApi } from "../planetApi";

export const store = configureStore({
  reducer: {
    [dbzApi.reducerPath]: dbzApi.reducer,
    [commentApi.reducerPath]: commentApi.reducer,
    [customCharacter.reducerPath]: customCharacter.reducer,
    [planetApi.reducerPath]: planetApi.reducer,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware()
      .concat(dbzApi.middleware)
      .concat(commentApi.middleware)
      .concat(customCharacter.middleware)
      .concat(planetApi.middleware),
});

setupListeners(store.dispatch)


