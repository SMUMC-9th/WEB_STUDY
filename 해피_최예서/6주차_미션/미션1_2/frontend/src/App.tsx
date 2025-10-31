import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SigninPage from "./pages/SigninPage.tsx";
import SignupPage from "./pages/SignupPage.tsx";
import RootLayout from "./layout/root-layout.tsx";
import MyPage from "./pages/MyPage.tsx";
import HomePage from "./pages/HomePage.tsx";
import RedirectPage from "./pages/RedirectPage.tsx";
import type { PropsWithChildren } from "react";
import { LoginProvider, useLogin } from "./context/context.tsx";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const ProtectedRoute = ({ children }: PropsWithChildren) => {
  const { isLogin } = useLogin();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogin) {
      navigate("/signin");
    }
  }, [isLogin, navigate]);

  return isLogin ? children : null;
};
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <h1>The path doesn't exist</h1>,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/signin",
        element: <SigninPage />,
      },
      {
        path: "/signup",
        element: <SignupPage />,
      },
      {
        path: "/my",
        element: (
          <ProtectedRoute>
            <MyPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/v1/auth/google/callback",
        element: <RedirectPage />,
      },
    ],
  },
]);

export const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LoginProvider>
        <RouterProvider router={router} />
      </LoginProvider>
      {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
}

export default App;
