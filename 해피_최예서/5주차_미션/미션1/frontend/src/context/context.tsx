import {
  createContext,
  type PropsWithChildren,
  useContext,
  useState,
  useEffect,
} from "react";

// 로그인 상태 관리용 타입
interface ILoginContext {
  isLogin: boolean; // 로그인 여부
  setIsLogin: (isLogin: boolean) => void; // 로그인 상태 변경 함수
}

// Context 생성
export const LoginContext = createContext<ILoginContext | undefined>(undefined);

export const LoginProvider = ({ children }: PropsWithChildren) => {
  // 로그인 여부 상태
  const [isLogin, setIsLoginState] = useState(false);

  // 페이지 새로고침 시, 로컬스토리지에 accessToken이 있으면 로그인 유지
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) setIsLoginState(true);
    else setIsLoginState(false);
  }, []);

  // 로그인 상태만 변경 (토큰 저장은 로그인 로직에서 담당)
  const setIsLogin = (value: boolean) => {
    setIsLoginState(value);
  };

  return (
    <LoginContext.Provider value={{ isLogin, setIsLogin }}>
      {children}
    </LoginContext.Provider>
  );
};

// Context 사용 훅
export const useLogin = (): ILoginContext => {
  const context = useContext(LoginContext);
  if (!context) {
    throw new Error("useLogin must be used in LoginProvider");
  }
  return context;
};
