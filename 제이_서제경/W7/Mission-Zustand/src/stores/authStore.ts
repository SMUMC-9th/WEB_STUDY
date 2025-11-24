import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { RequestLoginDto, RequestSignupDto } from "../types/auth";
import { getMyInfo, postLogin, postLogout, postSignup } from "../apis/auth";

interface User {
  id: number;
  name: string;
}

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  user: User | null;

  login: (data: RequestLoginDto) => Promise<void>;
  logout: () => Promise<void>;
  signup: (data: RequestSignupDto) => Promise<void>;
  fetchUser: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      accessToken: null,
      refreshToken: null,
      user: null,

      login: async (signInData: RequestLoginDto) => {
        const { data } = await postLogin(signInData);
        const newAccess = data.accessToken;
        const newRefresh = data.refreshToken;

        set({
          accessToken: newAccess,
          refreshToken: newRefresh,
        });

        if (data.id && data.name) {
          set({ user: { id: data.id, name: data.name } });
        } else {
          await get().fetchUser();
        }
      },

      logout: async () => {
        try {
          await postLogout();
        } finally {
          set({
            accessToken: null,
            refreshToken: null,
            user: null,
          });
        }
      },
      signup: async (signUpData: RequestSignupDto) => {
        await postSignup(signUpData);
      },
      fetchUser: async () => {
        const accessToken = get().accessToken;
        if (!accessToken) return;

        try {
          const { data } = await getMyInfo();
          set({ user: { id: data.id, name: data.name } });
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (e) {
          set({
            accessToken: null,
            refreshToken: null,
            user: null,
          });
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        user: state.user,
      }),
    }
  )
);
