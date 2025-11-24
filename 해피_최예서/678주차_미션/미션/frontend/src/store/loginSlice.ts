// 로그인 정보 저장하는 slice 만듦
import { createSlice } from '@reduxjs/toolkit'
import type {PayloadAction} from "@reduxjs/toolkit";

interface ILoginState {
  isLogin: boolean | undefined; // 로그인 여부 저장함
  accessToken: string | null;   // 토큰 저장함
}

const initialState: ILoginState = {
  isLogin: undefined, // 초기: 모름
  accessToken: null,
}

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    login(state, action: PayloadAction<string>) {
      const token = action.payload
      state.accessToken = token
      state.isLogin = true
      localStorage.setItem("accessToken", token) // localStorage 저장함
    },

    logout(state) {
      state.accessToken = null
      state.isLogin = false
      localStorage.removeItem("accessToken") // localStorage 삭제함
    },

    restore(state) {
      const token = localStorage.getItem("accessToken")
      if (token) {
        state.accessToken = token
        state.isLogin = true
      } else {
        state.accessToken = null
        state.isLogin = undefined
      }
    }
  },
})

export const { login, logout, restore } = loginSlice.actions
export default loginSlice.reducer
