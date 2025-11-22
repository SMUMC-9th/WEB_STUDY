import { create } from "zustand";
import { postSignin, postLogout } from "../api/auth";
import { RequestSigninDto } from "../types/auth";
import { LOCAL_STORAGE_KEY } from "../constants/key";

interface AuthState {
  // 상태
  accessToken: string | null;
  refreshToken: string | null;

  // 액션
  setAccessToken: (token: string | null) => void;
  setRefreshToken: (token: string | null) => void;
  login: (signinData: RequestSigninDto) => Promise<boolean>;
  logout: () => Promise<boolean>;
  initializeAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  // 초기 상태 (localStorage에서 가져오기)
  accessToken: localStorage.getItem(LOCAL_STORAGE_KEY.accessToken),
  refreshToken: localStorage.getItem(LOCAL_STORAGE_KEY.refreshToken),

  // accessToken 설정
  setAccessToken: (token) => {
    if (token) {
      localStorage.setItem(LOCAL_STORAGE_KEY.accessToken, token);
    } else {
      localStorage.removeItem(LOCAL_STORAGE_KEY.accessToken);
    }
    set({ accessToken: token });
  },

  // refreshToken 설정
  setRefreshToken: (token) => {
    if (token) {
      localStorage.setItem(LOCAL_STORAGE_KEY.refreshToken, token);
    } else {
      localStorage.removeItem(LOCAL_STORAGE_KEY.refreshToken);
    }
    set({ refreshToken: token });
  },

  // 로그인
  login: async (signinData) => {
    try {
      const { data } = await postSignin(signinData);

      if (data) {
        const newAccessToken = data.accessToken;
        const newRefreshToken = data.refreshToken;

        // localStorage 저장
        localStorage.setItem(LOCAL_STORAGE_KEY.accessToken, newAccessToken);
        localStorage.setItem(LOCAL_STORAGE_KEY.refreshToken, newRefreshToken);

        // 상태 업데이트
        set({
          accessToken: newAccessToken,
          refreshToken: newRefreshToken,
        });

        alert("로그인 성공");
        return true;
      }
      return false;
    } catch (error) {
      console.error("로그인 오류", error);
      alert("로그인 실패");
      return false;
    }
  },

  // 로그아웃
  logout: async () => {
    try {
      await postLogout();

      // localStorage 삭제
      localStorage.removeItem(LOCAL_STORAGE_KEY.accessToken);
      localStorage.removeItem(LOCAL_STORAGE_KEY.refreshToken);

      // 상태 초기화
      set({ accessToken: null, refreshToken: null });

      alert("로그아웃 성공");
      return true;
    } catch (error) {
      console.error("로그아웃 오류", error);
      alert("로그아웃 실패");
      return false;
    }
  },

  // 앱 시작 시 인증 상태 초기화
  initializeAuth: () => {
    const accessToken = localStorage.getItem(LOCAL_STORAGE_KEY.accessToken);
    const refreshToken = localStorage.getItem(LOCAL_STORAGE_KEY.refreshToken);
    set({ accessToken, refreshToken });
  },
}));
