import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  MoviesPage,
  DetailPage,
  HomePage,
  NotFoundPage,
  LandingPage,
} from "./pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: "movies/:category",
        element: <MoviesPage />,
      },
      {
        path: "movies/detail/:movieId",
        element: <DetailPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
