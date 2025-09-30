import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import RootLayout from "./layout/root-layout";
import Notfound from "./components/Notfound";
import HomePage from "./pages/HomePage";
import MovieDetail from "./pages/MovieDetail";
import Movie from "./pages/Movie";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <Notfound />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "popular",
        element: <Movie category="popular" />,
      },
      {
        path: "now",
        element: <Movie category="now_playing" />,
      },
      { path: "top", element: <Movie category="top_rated" /> },
      { path: "upcoming", element: <Movie category="upcoming" /> },
      { path: "detail/:id", element: <MovieDetail /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
