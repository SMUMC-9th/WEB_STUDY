import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/common/HomePage";
import Layout from "../layout/Layout";
import LoginPage from "../pages/auth/LoginPage";
import ErrorPage from "../pages/common/ErrorPage";
import Mypage from "../pages/auth/Mypage";
import SignupWizard from "../pages/auth/SignupWizard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/home", element: <HomePage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/signup", element: <SignupWizard /> },
      { path: "/mypage", element: <Mypage /> },
    ],
  },
]);
