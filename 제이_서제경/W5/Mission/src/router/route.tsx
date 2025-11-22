import { createBrowserRouter, type RouteObject } from "react-router-dom";
import HomePage from "../pages/common/HomePage";
import Layout from "../layout/Layout";
import LoginPage from "../pages/auth/LoginPage";
import Mypage from "../pages/auth/Mypage";
import SignupWizard from "../pages/auth/SignupWizard";
import NotFoundPage from "../pages/common/ErrorPage";
import GoogleLoginRedirectPage from "../pages/auth/GoogleLoginRedirectPage";
import ProtectedLayout from "../layout/ProtectedLayout";

// Public routes - 인증이 필요 없는 라우트
export const publicRoutes: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "login", element: <LoginPage /> },
      { path: "signup", element: <SignupWizard /> },
      { path: "v1/auth/google/callback", element: <GoogleLoginRedirectPage /> },
    ],
  },
];

// Protected routes - 인증이 필요한 라우트
export const protectedRoutes: RouteObject[] = [
  {
    path: "/",
    element: <ProtectedLayout />,
    errorElement: <NotFoundPage />,
    children: [{ path: "mypage", element: <Mypage /> }],
  },
];

// createBrowserRouter로 병합 - 최종 라우터 생성
export const router = createBrowserRouter([
  ...publicRoutes,
  ...protectedRoutes,
]);
