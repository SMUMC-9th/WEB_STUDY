import Button from "./component/button";
import { useTheme } from "./context/themeProvider";
import BackCard from "./backCard";
import FrontCard from "./frontCard";

function App() {
  const { isDarkmode, isFlipped, toggleTheme } = useTheme();
  return (
    <div>
      <div
        className={`flex flex-col items-center justify-center ${
          isDarkmode ? "bg-white" : "bg-black"
        } min-h-screen`}
      >
        <Button isDarkmode={isDarkmode} toggleTheme={toggleTheme} />
        {isFlipped ? <BackCard /> : <FrontCard />}
      </div>
    </div>
  );
}

export default App;
