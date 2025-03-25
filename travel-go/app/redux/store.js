"use client";

import { configureStore } from "@reduxjs/toolkit";
import destinationReducer from "./slices/destinationSlice";
import packageReducer from "./slices/packageSlice";

const store = configureStore({
  reducer: {
    destination: destinationReducer,
    package: packageReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
