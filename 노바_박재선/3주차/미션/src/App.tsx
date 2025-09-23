import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MoviePage from "./pages/MoviePage";
import NotFound from "./pages/not-found";
import MovieDetailPage from "./pages/MovieDetailPage";
import RootLayout from "./layout/root-layout";
import HomePage from "./pages/HomePage";




const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout/>,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "movies/:movieId(\\d+)", element: <MovieDetailPage /> },
      { path: "movies/:category", element: <MoviePage /> },
    ]
  },
 
])


function App() {

  return (
    <>
      <RouterProvider router={router} />
      {/* <MovieDetailPage /> */}
    </>
  );
}

export default App;