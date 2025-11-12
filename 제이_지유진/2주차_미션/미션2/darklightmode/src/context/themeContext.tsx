import { createContext, useContext, useState, type ReactNode } from "react";

//Context의 타입 정의
export interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

//Context 생성
// eslint-disable-next-line react-refresh/only-export-components
export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);

//Context 사용을 위한 커스텀 훅
// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTodo must be used within TodoProvider");
  return context;
};

//Context Provider 생성
export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
