import {THEME, useTheme} from "./context/ThemeProvider";
import ThemeToggleButton from "./ThemeToggleButton";
import clsx from 'clsx'

export default function Navbar() {
  const { theme } = useTheme();

  const isLightMode = theme === THEME.LIGHT;

  return (
    <div className={clsx('p-4 w-full flex justify-end',
      isLightMode ? 'bg-[#049be0]' : 'bg-black')}>
      <ThemeToggleButton />
    </div>
  );
}
