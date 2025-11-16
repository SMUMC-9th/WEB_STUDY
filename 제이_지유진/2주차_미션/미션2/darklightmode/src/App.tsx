import "./App.css";
import ThemeButton from "./components/ThemeButton";
import { useTheme } from "./context/themeContext";
import Clock from "./components/Clock";

function App() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div
      className={`min-h-screen flex items-center justify-center transition-colors duration-700 ${
        isDarkMode
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-black"
          : "bg-gradient-to-br from-blue-100 via-white to-pink-100"
      }`}
    >
      <div
        className={`p-10 rounded-2xl shadow-2xl transition-colors duration-700 ${
          isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
        }`}
      >
        <div className="flex justify-end">
          <ThemeButton isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
        </div>
        <Clock />
        {/* 설명 */}
        <p className="text-lg text-center text-gray-600 dark:text-gray-300 animate-fade-in delay-200">
          위 버튼을 눌러 다크 모드와 라이트 모드를 전환해보세요!
        </p>
      </div>
    </div>
  );
}

export default App;
