import { createBrowserRouter, RouterProvider } from "react-router-dom";
//tanstack query 연결하기
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
//tanstack devtools 연결하기
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "./App.css";
import RootLayout from "./layout/rootLayout";
import Auth from "./pages/auth";
import SignUp from "./pages/SignUp";
import Home from "./pages/home";
import Mypage from "./pages/mypage";
import RedirectPage from "./pages/RedirectPage"; // 새로 만든 컴포넌트
import ProtectedRoute from "./layout/ProtectedRoute";
import LpDetail from "./pages/LpDetail";
import Search from "./pages/Search";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Auth /> },
      { path: "signup", element: <SignUp /> },
      { path: "v1/auth/google/callback", element: <RedirectPage /> },

      {
        element: <ProtectedRoute />,
        children: [
          { path: "my", element: <Mypage /> },
          {
            path: "lp/:id",
            element: <LpDetail />,
          },
          { path: "home", element: <Home /> },
          { path: "/search", element: <Search /> },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
