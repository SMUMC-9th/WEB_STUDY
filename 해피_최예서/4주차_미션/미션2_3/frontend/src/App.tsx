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

const ProtectedRoute = ({ children }: PropsWithChildren) => {
  const { isLogin } = useLogin();
  if (isLogin === false) {
    alert("Please log in");
    window.location.href = "/signin";
  }
  return children;
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

function App() {
  return (
    <LoginProvider>
      <RouterProvider router={router} />
    </LoginProvider>
  );
}

export default App;
