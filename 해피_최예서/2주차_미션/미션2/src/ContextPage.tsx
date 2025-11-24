import {THEME, ThemeProvider, useTheme} from "./context/ThemeProvider";
import Navbar from "./Navbar";
import ThemeContent from "./ThemeContent";

export default function ContextPage() {

  return (
    <ThemeProvider >
      <div className = 'flex flex-col items-center justify-center min-h-screen'>
        <Navbar />
        <main className= 'flex-1 w-full'> {/* flex-1 : flex-grow: 1와 같다. <main>이 남는 공간 다 차지 */}
          <ThemeContent />
        </main>
      </div>
    </ThemeProvider>
  );
}
