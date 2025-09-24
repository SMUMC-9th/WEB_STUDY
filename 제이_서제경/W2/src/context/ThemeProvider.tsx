import { createContext, useContext, useState, type ReactNode } from "react";

export const THEME = {
  LIGHT: "LIGHT",
  DARK: "DARK",
} as const;

export type TTHEME = (typeof THEME)[keyof typeof THEME]; // "LIGHT" | "DARK"

interface IThemeContext {
  theme: TTHEME;
  toggleTheme: () => void;
}

// context 생성
export const ThemeContext = createContext<IThemeContext | undefined>(undefined);

// context provider 생성
export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<TTHEME>(THEME.LIGHT);

  const toggleTheme = (): void => {
    setTheme((preTheme) =>
      preTheme === THEME.LIGHT ? THEME.DARK : THEME.LIGHT
    );
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

//제공해주는 함수를 만들어야 함!!!
export const useTheme = () => {
  const context = useContext(ThemeContext);

  // 에러처리도 같이 해주자
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider.");
  }
  return context;
};
