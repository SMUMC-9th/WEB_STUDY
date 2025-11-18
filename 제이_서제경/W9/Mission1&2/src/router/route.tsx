import { createBrowserRouter, type RouteObject } from "react-router-dom";
import Layout from "../layout/Layout";
import ErrorPage from "../pages/common/ErrorPage";
import HomePage from "../pages/home/HomePage";

export const publicRoutes: RouteObject[] = [
  {
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
    ],
  },
];

// 최종 라우터 생성
export const router = createBrowserRouter([...publicRoutes]);
