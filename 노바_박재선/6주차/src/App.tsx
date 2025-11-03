// import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
// import './App.css';

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider, type RouteObject } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import NotFound from "./pages/NotFound";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import GoogleRedirectPage from "./pages/GoogleRedirectPage";

import { AuthProvider } from "./context/AuthContext";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Mypage from "./pages/Mypage";
import LpDetailPage from "./pages/LpDetailPage";
import ProtectedLayout from "./pages/ProtectedLayout";

// import NotFound from './pages/NotFound';
// import LoginPage from './pages/LoginPage';
// import RootLayout from './layouts/RootLayout';
// import HomePage from './pages/HomePage';
// import SignupPage from './pages/SignupPage';
// import GoogleRedirectPage from './pages/GoogleRedirectPage';
// import Mypage from './pages/Mypage';
// import type { PropsWithChildren } from 'react';
// import { AuthProvider, useAuth } from './context/AuthContext';
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
// //1. 홈페이지
// //2. 로그인 페이지
// //3. 회원가입 페이지

// const PublicRoute = ({children}: PropsWithChildren) => {
//   const {accessToken} = useAuth();
//   if(accessToken) {
//     return <Navigate to="/" replace />;
//   }
//   return children;

// }

// const ProtectedRoute = ({children}:PropsWithChildren) => {
//   const {accessToken} = useAuth();
//   if(accessToken === null){
//     alert('여기는 로그인한 사용자만 접근할 수 있음.')
//     window.location.href='/login';
//     return null;
//   }
//   return children;
// }


// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <RootLayout />,
//     errorElement: <NotFound />,
//     children: [
//       {index: true, element: <HomePage />},
//       {path: "login", element: <PublicRoute><LoginPage /></PublicRoute>},
//       {path: "signup", element: <PublicRoute><SignupPage /></PublicRoute>},
//       {path: "mypage", element:<ProtectedRoute><Mypage/></ProtectedRoute>},
//       {path: "v1/auth/google/callback", element: <GoogleRedirectPage />},
//       {path: "*", element: <NotFound />}
//     ]
//   }
// ])

// const queryClient = new QueryClient();

// function App() {

//   return (
//     <QueryClientProvider client={queryClient}>
//       <AuthProvider>
//         <RouterProvider router={router} />
//       </AuthProvider>
//       <ReactQueryDevtools 
//         initialIsOpen={false}
//         buttonPosition='bottom-right'
//         position='bottom'
//       />
//     </QueryClientProvider>
    
    
//   )
// }

// export default App;







export const queryClient = new QueryClient();

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
      
    ],
  },
];

// protectedRoutes: 인증이 필요한 라우트
const protectedRoutes: RouteObject[] = [
  {
    path: "/",
    element: <ProtectedLayout />,
    errorElement: <NotFound />,
    children: [
      { path: "/mypage", element: <Mypage /> },
      { path: "/lps/:lpid", element: <LpDetailPage />},
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

export default App
