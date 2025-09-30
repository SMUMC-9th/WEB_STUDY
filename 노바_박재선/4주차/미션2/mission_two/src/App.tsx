import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';

import NotFound from './pages/NotFound';
import LoginPage from './pages/LoginPage';
import RootLayout from './layouts/RootLayout';
import HomePage from './pages/HomePage';
import SignupPage from './pages/SignupPage';
//1. 홈페이지
//2. 로그인 페이지
//3. 회원가입 페이지

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      {index: true, element: <HomePage />},
      {path: "login", element: <LoginPage />},
      {path: "signup", element: <SignupPage />},
      {path: "*", element: <NotFound />}
    ]
  }
])

function App() {

  return (
    <div>
      {<RouterProvider router={router} />}
    </div>
  )
}

export default App;
