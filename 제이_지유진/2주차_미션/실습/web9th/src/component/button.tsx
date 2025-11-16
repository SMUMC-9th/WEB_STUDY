import { Sun, Moon } from "lucide-react";

type ButtonProps = {
  isDarkmode: boolean;
  toggleTheme: () => void;
};
export default function Button({ isDarkmode, toggleTheme }: ButtonProps) {
  const isDarkMode = isDarkmode;
  const toggleDarkMode = toggleTheme;

  return (
    <div>
      <button
        className="absolute top-5 right-5 p-2 rounded-full bg-gray-800 text-white hover:bg-gray-700 transition"
        onClick={toggleDarkMode}
      >
        {isDarkMode ? <Sun /> : <Moon />}
      </button>
    </div>
  );
}
