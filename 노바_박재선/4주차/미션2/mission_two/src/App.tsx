import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';

import NotFound from './pages/NotFound';
import LoginPage from './pages/LoginPage';
import RootLayout from './layouts/RootLayout';
import HomePage from './pages/HomePage';
import SignupPage from './pages/SignupPage';
import GoogleRedirectPage from './pages/GoogleRedirectPage';
import Mypage from './pages/Mypage';
import type { PropsWithChildren } from 'react';
//1. 홈페이지
//2. 로그인 페이지
//3. 회원가입 페이지
const ProtectedRoute = ({children}:PropsWithChildren) => {
  const isLogin = false;
  if(isLogin === false){
    alert('여기는 로그인한 사용자만 접근할 수 있음.')
    window.location.href='/login';
  }
  return children;
}


const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      {index: true, element: <HomePage />},
      {path: "login", element: <LoginPage />},
      {path: "signup", element: <SignupPage />},
      {path: "mypage", element:<ProtectedRoute><Mypage/></ProtectedRoute>},
      {path: "v1/auth/google/callback", element: <GoogleRedirectPage />},
      {path: "*", element: <NotFound />}
    ]
  }
])

function App() {

  return (
    <RouterProvider router={router} />
  )
}

export default App;
