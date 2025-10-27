import {
  createContext,
  useContext,
  useState,
  type ReactNode,
  useCallback,
} from "react";

interface User {
  id: string;
  email: string;
  nickname: string;
}

interface AuthContextType {
  isLogged: boolean;
  setIsLogged: (value: boolean) => void;
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  // 로그인 함수
  const login = useCallback((userData: User) => {
    setUser(userData);
    setIsLogged(true);
  }, []);

  // 로그아웃 함수
  const logout = useCallback(() => {
    setUser(null);
    setIsLogged(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{ isLogged, setIsLogged, user, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Context 쉽게 쓰기 위한 custom hook
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
