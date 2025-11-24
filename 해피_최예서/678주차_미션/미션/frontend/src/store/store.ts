import {configureStore} from "@reduxjs/toolkit";
import loginSlice from "./loginSlice.ts";

export const store = configureStore({
  reducer: {
    login: loginSlice // ??
  }
})

// 타입스크립트용 타입들
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;