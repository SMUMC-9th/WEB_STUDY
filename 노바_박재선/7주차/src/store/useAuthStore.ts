import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { useShallow } from "zustand/shallow";
import { postSignin, postLogout } from "../apis/auth";
import type { RequestSigninDto } from "../types/auth";
import { LOCAL_STORAGE_KEY } from "../constants/key";

interface AuthActions {
  setAccessToken: (token: string | null) => void;
  setRefreshToken: (token: string | null) => void;
  login: (signinData: RequestSigninDto) => Promise<boolean>;
  logout: () => Promise<boolean>;
  clearTokens: () => void;
}

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  actions: AuthActions;
}

const getInitialToken = (key: string): string | null => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch {
    return null;
  }
};

export const useAuthStore = create<AuthState>()(
  immer((set) => ({
    accessToken: getInitialToken(LOCAL_STORAGE_KEY.accessToken),
    refreshToken: getInitialToken(LOCAL_STORAGE_KEY.refreshToken),

    actions: {
      setAccessToken: (token: string | null): void => {
        if (token) {
          localStorage.setItem(
            LOCAL_STORAGE_KEY.accessToken,
            JSON.stringify(token)
          );
        } else {
          localStorage.removeItem(LOCAL_STORAGE_KEY.accessToken);
        }
        set((state) => {
          state.accessToken = token;
        });
      },

      setRefreshToken: (token: string | null): void => {
        if (token) {
          localStorage.setItem(
            LOCAL_STORAGE_KEY.refreshToken,
            JSON.stringify(token)
          );
        } else {
          localStorage.removeItem(LOCAL_STORAGE_KEY.refreshToken);
        }
        set((state) => {
          state.refreshToken = token;
        });
      },

      login: async (signinData: RequestSigninDto): Promise<boolean> => {
        try {
          const { data } = await postSignin(signinData);

          if (data) {
            localStorage.setItem(
              LOCAL_STORAGE_KEY.accessToken,
              JSON.stringify(data.accessToken)
            );
            localStorage.setItem(
              LOCAL_STORAGE_KEY.refreshToken,
              JSON.stringify(data.refreshToken)
            );

            set((state) => {
              state.accessToken = data.accessToken;
              state.refreshToken = data.refreshToken;
            });
            return true;
          }
          return false;
        } catch (error) {
          console.error("로그인 오류", error);
          alert("로그인 실패");
          return false;
        }
      },

      logout: async (): Promise<boolean> => {
        try {
          await postLogout();

          localStorage.removeItem(LOCAL_STORAGE_KEY.accessToken);
          localStorage.removeItem(LOCAL_STORAGE_KEY.refreshToken);

          set((state) => {
            state.accessToken = null;
            state.refreshToken = null;
          });
          alert("로그아웃 성공");
          return true;
        } catch (error) {
          console.error("로그아웃 오류", error);
          alert("로그아웃 실패");
          return false;
        }
      },

      clearTokens: (): void => {
        localStorage.removeItem(LOCAL_STORAGE_KEY.accessToken);
        localStorage.removeItem(LOCAL_STORAGE_KEY.refreshToken);

        set((state) => {
          state.accessToken = null;
          state.refreshToken = null;
        });
      },
    },
  }))
);

export const useAuthInfo = () => {
  return useAuthStore(
    useShallow((state) => ({
      accessToken: state.accessToken,
      refreshToken: state.refreshToken,
    }))
  );
};

export const useAuthActions = () => useAuthStore((state) => state.actions);
