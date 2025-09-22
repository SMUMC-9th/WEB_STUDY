import {THEME, useTheme} from "./context/ThemeProvider";
import clsx from 'clsx'

export default function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme();

  const isLightMode = theme === THEME.LIGHT;


  return (
    <button
      onClick={toggleTheme}
      className= {clsx('px-4 py-2 rounded-md transition-all',{ // 동적 스타일링
        // 모든 속성이 변화에 에니메이션 적용
        'bg-[#12309a] text-white': !isLightMode,
        'bg-[#bad460] text-black': isLightMode,
      }
      )}
    >
      {isLightMode ? '🌙 Dark Mode' : '☀️ Light Mode'}
    </button>
  );
}
