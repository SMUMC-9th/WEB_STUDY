import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MoviePage from "./pages/MoviePage";
import NotFound from "./pages/not-found";
import MovieDetailPage from "./pages/MovieDetailPage";
import RootLayout from "./layout/root-layout";
import HomePage from "./pages/HomePage";
import './App.css'



const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout/>,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "movies/:movieId(\\d+)", element: <MovieDetailPage /> },
      { path: "movies/:category", element: <MoviePage /> },
      { path: "*", element: <NotFound /> }
      
    ]
  },
])


function App() {
  return (
    <div>
      {<RouterProvider router={router} />}
      {/* <MovieDetailPage /> */}
    </div>
  );
}

export default App;