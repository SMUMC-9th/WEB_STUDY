import { createBrowserRouter } from "react-router-dom";
import MoviePage from "../pages/movie/MoviePage";
import MovieDetailPage from "../pages/movie/MovieDetailPage";
import NotFoundPage from "../pages/common/NotFoundPage";
import Layout from "../layout/Layout";
import HomePage from "../pages/home/HomePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFoundPage />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "movies/:category", element: <MoviePage /> },
      { path: "movie/:movieId", element: <MovieDetailPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
  { path: "*", element: <NotFoundPage /> },
]);

export default router;
