import {THEME, useTheme} from "./context/ThemeProvider.tsx";
import clsx from 'clsx'

export default function ThemeContent() {
  const { theme, toggleTheme } = useTheme();

  const isLightMode = theme === THEME.LIGHT;

  return (
    <div className={
      clsx('p-4 h-dvh', isLightMode ? 'bg-[#e0e0db]' : 'bg-[#3a3a3a]')}
    >
      <h1 className={
        clsx('text-wxl font-bold',
          isLightMode ? 'text-black' : 'text-white')}
      >ThemeContent</h1>

      <p className={clsx('mt-3', isLightMode ? 'text-black' : 'text-white')}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium alias at atque, consequuntur corporis doloremque, excepturi fugiat harum itaque maxime numquam possimus provident! Alias asperiores cupiditate deserunt dicta, doloremque eligendi et numquam, officia porro, praesentium repellat similique temporibus unde? Modi.</p>
    </div>
  );
}
