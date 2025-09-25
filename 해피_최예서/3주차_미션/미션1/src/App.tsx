import './App.css'
// 1. React Router에서 필요한 함수/컴포넌트를 import
import {createBrowserRouter, RouterProvider} from "react-router-dom";

import HomePage from "./pages/HomePage.tsx";
import MoviePage from "./pages/MoviePage.tsx";
import RelatedMoviePage from "./pages/RelatedMoviePage.tsx";
import NotFoundPage from "./pages/NotFoundPage.tsx";
import MovieDetailPage from "./pages/MovieDetailPage.tsx";

// 2. 라우터 만들기 (path와 element 정의)
const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: 'movies/category/:category',  // :category: 동적 세그먼트 << useParams()로 이용 가능
        element: <MoviePage />,
      },
      {
        path: 'movies/detail/:movieId',
        element: <MovieDetailPage />,
      },
      {
        path: 'movies/related/:movieId',
        element: <RelatedMoviePage />,
      },
    ],
  },
])

function App() {
  return (
    // 3. RouterProvider로 값 전달 (router를 실제 앱에 적용해주는 역할)
   <RouterProvider router = {router} />
  )
}

export default App