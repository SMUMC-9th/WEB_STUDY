import { RouteObject, RouterProvider, createBrowserRouter, Outlet } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import NotFoundPage from './pages/NotFoundPage'
import LoginPage from './pages/LoginPage'
import HomeLayout from './layouts/HomeLayout'
import SignupPage from './pages/SignupPage'
import MyPage from './pages/MyPage'
import LoginRedirect from './pages/LoginRedirect'
import ProtectedLayout from './layouts/ProtectedLayout'
import { AuthProvider } from './providers/AuthProvider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

export const queryClient = new QueryClient();

// RootLayout - QueryClientProvider와 AuthProvider를 Router 내부에 배치
const RootLayout = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Outlet />
        <ReactQueryDevtools initialIsOpen={false} />
      </AuthProvider>
    </QueryClientProvider>
  );
};

// publicRoutes : 인증 없이 접근 가능한 라우트
const publicRoutes: RouteObject[] = [
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "login", element: <LoginPage /> },
      { path: "signup", element: <SignupPage /> },
      { path: "v1/auth/google/callback", element: <LoginRedirect /> },
    ],
  },
];

// protectedRoutes: 인증이 필요한 라우트
const protectedRoutes: RouteObject[] = [
  {
    path: "/",
    element: <ProtectedLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "my",
        element: <MyPage />,
      },
    ],
  },
];

// RootLayout으로 감싸진 라우트 구조
const rootRoutes: RouteObject[] = [
  {
    element: <RootLayout />,
    children: [...publicRoutes, ...protectedRoutes],
  },
];

const router = createBrowserRouter(rootRoutes);

function App() {
  return <RouterProvider router={router} />;
}

export default App