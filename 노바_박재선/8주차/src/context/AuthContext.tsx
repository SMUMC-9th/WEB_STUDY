import {
  createContext,
  useState,
  useContext,
  type PropsWithChildren,
} from "react";
import type { RequestSigninDto } from "../types/auth";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import { postSignin } from "../apis/auth";
import { postLogout } from "../apis/auth";

interface AuthContextType {
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
  refreshToken: string | null;
  setRefreshToken: (token: string | null) => void;
  login: (signinData: RequestSigninDto) => Promise<boolean>;
  logout: () => Promise<boolean>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const {
    getItem: getAccessTokenFromStorage,
    setItem: setAccessTokenInStorage,
    removeItem: removeAccessTokenFromStorage,
  } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
  const {
    getItem: getRefreshTokenFromStorage,
    setItem: setRefreshTokenInStorage,
    removeItem: removeRefreshTokenFromStorage,
  } = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);

  const [accessToken, setAccessToken] = useState<string | null>(
    getAccessTokenFromStorage() // 지연초기화
  );
  const [refreshToken, setRefreshToken] = useState<string | null>(
    getRefreshTokenFromStorage()
  );
  const login = async (signinData: RequestSigninDto) => {
    try {
      const { data } = await postSignin(signinData);

      if (data) {
        const newAccessToken = data.accessToken;
        const newRefreshToken = data.refreshToken;

        setAccessTokenInStorage(newAccessToken);
        setRefreshTokenInStorage(newRefreshToken);

        setAccessToken(newAccessToken);
        setRefreshToken(newRefreshToken);
        // alert("로그인 성공");
        // window.location.href="mypage";
        return true;
      }
      return false;
    } catch (error) {
      console.error("로그인 오류", error);
      alert("로그인 실패");
      return false;
    }
  };
  const logout = async () => {
    try {
      await postLogout();
      removeAccessTokenFromStorage();
      removeRefreshTokenFromStorage();
      //localStorage.clear(); <- 이렇게 한번에 삭제할수 있느데 왜안하냐?
      //지금은 해도 되는데, localStorage에 많은 정보를 담는 큰 웹사이트에서는 로그인 뿐만아니라 다지우는건 문제가 있을수 있어서

      setAccessToken(null);
      setRefreshToken(null);
      alert("로그아웃 성공");
      return true;
    } catch (error) {
      console.error("로그아웃 오류", error);
      alert("로그아웃 실패");
      return false;
    }
  };
  return (
    <AuthContext.Provider
      value={{
        accessToken,
        setAccessToken,
        refreshToken,
        setRefreshToken,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// const context = useContext(AuthContext); //이과정이 매번 일어나니까 훅으로 만들자
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("AuthContext를 찾을 수 없습니다.");
  }

  return context;
};
