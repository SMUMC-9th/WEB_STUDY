import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import RootLayout from "./layout/root-layout";
import Notfound from "./components/Notfound";
import HomePage from "./pages/HomePage";
import Popular from "./pages/Popular";
import Now from "./pages/Now";
import Top from "./pages/Top";
import Upcoming from "./pages/Upcoming";
import MovieDetail from "./pages/MovieDetail";

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
        element: <Popular />,
      },
      {
        path: "now",
        element: <Now />,
      },
      { path: "top", element: <Top /> },
      { path: "upcoming", element: <Upcoming /> },
      { path: "detail/:id", element: <MovieDetail /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
