import {
  createContext,
  useContext,
  useState,
  type ReactNode,
  useCallback,
} from "react"; // 1. context API 관련 함수들을 일단 import 해주어야함

// 2. 이제부터는 내가 context로 관리할 데이터의 타입을 정의해줌
// user 객체의 타입도 미리 정의
interface User {
  id: number;
  name: string;
}
// 3. AuthContext가 제공할 값들의 타입 정의
interface AuthContextType {
  isLogged: boolean;
  user: User | null;
  login: (user: User) => void;
  setIsLogged: (value: boolean) => void;
}

// 4. context 생성 (초기값은 undefined로 설정) -> useAuth 커스텀 훅에서 처리
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 5. AuthProvider 컴포넌트 생성
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [isLogged, setIsLogged] = useState(
    !!localStorage.getItem("accessToken")
  );

  const login = useCallback((userData: User) => {
    setUser(userData);
    setIsLogged(true);
    localStorage.setItem("user", JSON.stringify(userData));
  }, []);

  return (
    <AuthContext.Provider value={{ isLogged, user, login, setIsLogged }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
