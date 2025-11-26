import "./App.css";
import HomePage from "./pages/HomePage.tsx";
import { MovieProvider } from "./Context/MovieContext.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MovieDetailPage from "./pages/MovieDetailPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/:id",
    element: <MovieDetailPage />,
  },
]);

function App() {
  return (
    <>
      <div className="App">
        <MovieProvider>
          <RouterProvider router={router} />
        </MovieProvider>
      </div>
    </>
  );
}

export default App;
