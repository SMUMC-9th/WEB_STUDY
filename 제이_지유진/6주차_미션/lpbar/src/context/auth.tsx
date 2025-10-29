import {
  createContext,
  useContext,
  useState,
  type ReactNode,
  useCallback,
} from "react";

interface User {
  id: number;
  name: string;
}

interface AuthContextType {
  isLogged: boolean;
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  setIsLogged: (value: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLogged, setIsLogged] = useState(
    !!localStorage.getItem("accessToken")
  );
  const logout = useCallback(() => {
    const isConfirmed = window.confirm("정말 로그아웃하시겠습니까?");
    if (!isConfirmed) return;

    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setUser(null);
    setIsLogged(false);
  }, []);

  const login = useCallback((userData: User) => {
    setUser(userData);
    setIsLogged(true);
  }, []);

  return (
    <AuthContext.Provider
      value={{ isLogged, user, login, logout, setIsLogged }}
    >
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
