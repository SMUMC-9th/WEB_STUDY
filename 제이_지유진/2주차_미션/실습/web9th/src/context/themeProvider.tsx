/* eslint-disable react-refresh/only-export-components */
import { createContext, type ReactNode, useContext, useState } from "react";

export interface ThemeContextType {
  isDarkmode: boolean;
  isFlipped: boolean;
  flippedCard: () => void;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [isDarkmode, setIsDarkmode] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  const flippedCard = () => {
    setIsFlipped((prev) => !prev);
  };
  const toggleTheme = () => {
    setIsDarkmode((prevMode) => !prevMode);
  };

  return (
    <ThemeContext.Provider
      value={{ isFlipped, isDarkmode, toggleTheme, flippedCard }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
