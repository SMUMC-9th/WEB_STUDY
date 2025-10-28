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
  setIsLogged: (value: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLogged, setIsLogged] = useState(
    !!localStorage.getItem("accessToken")
  );

  const login = useCallback((userData: User) => {
    setUser(userData);
    setIsLogged(true);
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
