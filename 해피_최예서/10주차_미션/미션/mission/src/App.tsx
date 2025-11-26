import "./App.css";
import HomePage from "./pages/HomePage.tsx";
import { MovieProvider } from "./Context/MovieContext.tsx";

function App() {
  return (
    <>
      <MovieProvider>
        <HomePage />
      </MovieProvider>
    </>
  );
}

export default App;
