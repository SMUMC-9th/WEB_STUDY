import {
  createContext,
  type PropsWithChildren,
  useContext,
  useState,
  useEffect,
} from "react";

interface ILoginContext {
  isLogin: boolean;
  setIsLogin: (isLogin: boolean) => void;
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
}

export const LoginContext = createContext<ILoginContext | undefined>(undefined);

export const LoginProvider = ({ children }: PropsWithChildren) => {
  const [isLogin, setIsLoginState] = useState(false);
  const [accessToken, setAccessTokenState] = useState<string | null>(null);

  // 새로고침 시 accessToken 복원
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setAccessTokenState(token);
      setIsLoginState(true);
    } else {
      setAccessTokenState(null);
      setIsLoginState(false);
    }
  }, []);

  const setIsLogin = (value: boolean) => setIsLoginState(value);

  // accessToken 관리 함수
  const setAccessToken = (token: string | null) => {
    if (token) {
      localStorage.setItem("accessToken", token);
      setAccessTokenState(token);
      setIsLoginState(true);
    } else {
      localStorage.removeItem("accessToken");
      setAccessTokenState(null);
      setIsLoginState(false);
    }
  };

  return (
    <LoginContext.Provider
      value={{ isLogin, setIsLogin, accessToken, setAccessToken }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export const useAuth = (): ILoginContext => {
  const context = useContext(LoginContext);
  if (!context) {
    throw new Error("useAuth must be used in LoginProvider");
  }
  return context;
};
