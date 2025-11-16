import { Moon, Sun } from "lucide-react";
import { useTheme } from "../context/ThemeProvider";

export default function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      title={theme === "LIGHT" ? "다크 모드로 전환" : "라이트 모드로 전환"}
      className={`fixed top-4 right-4 z-50 p-3 rounded-full shadow-md transition
        ${
          theme === "LIGHT"
            ? "bg-white/60 hover:bg-white"
            : "bg-gray-800/90 hover:bg-gray-700"
        }`}
    >
      {theme === "LIGHT" ? (
        <Moon className="text-2xl text-gray-800" />
      ) : (
        <Sun className="text-2xl text-yellow-300" />
      )}
    </button>
  );
}
