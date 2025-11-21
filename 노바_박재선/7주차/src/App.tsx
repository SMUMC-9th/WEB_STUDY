import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  createBrowserRouter,
  RouterProvider,
  useNavigate,
  type RouteObject,
} from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import NotFound from "./pages/NotFound";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import GoogleRedirectPage from "./pages/GoogleRedirectPage";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Mypage from "./pages/Mypage";
import LpDetailPage from "./pages/LpDetailPage";
import ThrottlePage from "./pages/ThrottlePage";

export const queryClient = new QueryClient();

function Protected({ children }: { children: React.ReactNode }) {
  const { accessToken } = useAuth();
  const nav = useNavigate();
  if (!accessToken) {
    alert("로그인후 접근이 가능합니다!");
    nav("/");
  }
  return <>{children}</>;
}

// publicRoutes : 인증 없이 접근 가능한 라우트
const publicRoutes: RouteObject[] = [
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "login", element: <LoginPage /> },
      { path: "signup", element: <SignupPage /> },
      { path: "v1/auth/google/callback", element: <GoogleRedirectPage /> },
      { path: "/throttle", element: <ThrottlePage /> },
    ],
  },
];

// protectedRoutes: 인증이 필요한 라우트
const protectedRoutes: RouteObject[] = [
  {
    path: "/",
    element: (
      <Protected>
        <RootLayout></RootLayout>
      </Protected>
    ),
    errorElement: <NotFound />,
    children: [
      { path: "/mypage", element: <Mypage /> },
      { path: "/lps/:lpid", element: <LpDetailPage /> },
    ],
  },
];

// 라우트 합치기
const router = createBrowserRouter([...publicRoutes, ...protectedRoutes]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
