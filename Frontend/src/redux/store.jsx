/* eslint-disable no-undef */
import { configureStore } from "@reduxjs/toolkit";
import languageReducer from "./slices/LanguageSlice/languageSlice";
import authReducer from "./slices/LoginSlice/authSlice";
export const store = configureStore({
  reducer: {
    authData: authReducer,
    languageData: languageReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});
