import { createContext, useContext } from "react";
import { RequestSigninDto } from "../types/auth";

interface AuthContextType {
  accessToken: string | null;
  refreshToken: string | null;
  setAccessToken: (token: string | null) => void; 
  setRefreshToken: (token: string | null) => void;
  login: (signInData: RequestSigninDto) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  accessToken: null,
  refreshToken: null,
  setAccessToken: () => {},
  setRefreshToken: () => {},
  login: async () => {},
  logout: async () => {},
});

export const useAuth = () => {
  const context: AuthContextType = useContext(AuthContext);
  if (!context) {
    throw new Error("AuthContext를 찾을 수 없습니다.");
  }

  return context;
};