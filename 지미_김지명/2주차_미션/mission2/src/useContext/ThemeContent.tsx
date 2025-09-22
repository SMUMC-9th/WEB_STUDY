import clsx from "clsx";
import { THEME, useTheme } from "../context/ThemeProvider";

export default function ThemeContent() {
    const { theme, toggleTheme }= useTheme();

    const isLightMode = theme === THEME.LIGHT;

  return (
    <div className={clsx (
        'p-4 h-dvh w-full',
        isLightMode ? 'bg-white' : 'bg-gray-800'
    )}>
      <h1 className={clsx (
        'text-2xl font-bold',
        isLightMode ? 'text-black' : 'text-white'
      )}>
        Theme Context
      </h1>
      <p className={clsx (
        'mt-2',
        isLightMode ? 'text-black' : 'text-white'
      )}>
        안녕하세요? 저는 지금 배고파요 아까 닭가슴살을 먹었지만 지금은 60계 치킨에 쯔란윙봉이 먹고싶네요
      </p>
    </div>
  )
}
