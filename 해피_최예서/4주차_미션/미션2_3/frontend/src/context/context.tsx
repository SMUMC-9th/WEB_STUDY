import { createContext, type PropsWithChildren, useContext } from "react";
import { useState } from "react";
// 상태로 로그인 됐는지 안 됐는지 관리한다.
// 로그인했을때 상태 변경
// 로그아웃 했을 떄 상태변경
// 토큰 만료될때 상태변경

// 로그인한 상태는 ProtectedRoute에서 필요하다

interface ILoginContext {
  isLogin: boolean;
  setIsLogin: (isLogin: boolean) => void;
}

export const LoginContext = createContext<ILoginContext | undefined>(undefined);

export const LoginProvider = ({ children }: PropsWithChildren) => {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <LoginContext.Provider value={{ isLogin, setIsLogin }}>
      {children}
    </LoginContext.Provider>
  );
};

export const useLogin = (): ILoginContext => {
  const context = useContext(LoginContext);
  if (!context) {
    throw new Error("useLogin must be used in LoginProvider");
  }
  return context;
};
