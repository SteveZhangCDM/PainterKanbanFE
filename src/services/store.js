import { configureStore } from "@reduxjs/toolkit";
import { paintApi } from "./paintsSlice";
import { adminApi } from "./adminSlice";

export const store = configureStore({
  reducer: {
    [adminApi.reducerPath]: adminApi.reducer,
    [paintApi.reducerPath]: paintApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(paintApi.middleware, adminApi.middleware),
});
