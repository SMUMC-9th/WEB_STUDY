import {
  createContext,
  useState,
  type PropsWithChildren,
  useContext,
  type JSX,
} from "react";

type TTheme = "LIGHT" | "DARK";

interface IThemeContext {
  theme: TTheme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<IThemeContext | undefined>(undefined);

export function ThemeProvider({ children }: PropsWithChildren): JSX.Element {
  const [theme, setTheme] = useState<TTheme>("LIGHT");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "LIGHT" ? "DARK" : "LIGHT"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = (): IThemeContext => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error(
      "useTheme은 반드시 ThemeProvider 내부에서 사용해야 합니다."
    );
  }
  return context;
};
