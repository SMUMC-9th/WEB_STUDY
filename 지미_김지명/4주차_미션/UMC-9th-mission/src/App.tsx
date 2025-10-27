import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import NotFoundPage from './pages/NotFoundPage'
import LoginPage from './pages/LoginPage'
import HomeLayout from './layouts/HomeLayout'
import SignupPage from './pages/SignupPage'
import MyPage from './pages/MyPage'
import LoginRedirect from './pages/LoginRedirect'
import type { PropsWithChildren } from 'react'

const ProtectedRoute = ({children}:PropsWithChildren) => {
  const isLogin = false;
  if (isLogin === false) {
    alert("여기는 로그인 한 사용자만 접근할 수 있습니다.");
    window.location.href='/login';
  } 
  return children;
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'signup', element: <SignupPage /> },
      { path: 'my', element: <ProtectedRoute><MyPage /></ProtectedRoute>},
      { path: 'v1/auth/google/callback', element: <LoginRedirect />},
    ]
  }
])

function App() {

  return <RouterProvider router={router} />;
}

export default App
