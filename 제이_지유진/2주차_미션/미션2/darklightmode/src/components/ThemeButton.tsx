import { Sun, Moon } from "lucide-react";

export type TButtonProps = {
  isDarkMode: boolean;
  toggleTheme: () => void;
};

export default function ThemeButton({ isDarkMode, toggleTheme }: TButtonProps) {
  return (
    <div>
      <button
        className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors duration-300"
        onClick={toggleTheme}
        aria-label="Toggle Theme"
      >
        {isDarkMode ? <Sun /> : <Moon />}
      </button>
    </div>
  );
}
