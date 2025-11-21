import { create } from "zustand";

interface User {
  id: number;
  name: string;
}

interface AuthState {
  isLogged: boolean;
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  setIsLogged: (value: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  // user의 초기값을 localStorage에서 불러오기
  user: (() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  })(),
  isLogged: !!localStorage.getItem("accessToken"),

  // --- 액션 ---
  login: (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    set({ user: userData, isLogged: true });
  },

  logout: () => {
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    set({ user: null, isLogged: false });
  },

  setIsLogged: (value) => set({ isLogged: value }),
}));
