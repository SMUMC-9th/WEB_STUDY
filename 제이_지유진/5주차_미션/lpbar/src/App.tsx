import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import RootLayout from "./layout/rootLayout";
import Auth from "./pages/auth";
import SignUp from "./pages/SignUp";
import Home from "./pages/home";
import Mypage from "./pages/mypage";
import RedirectPage from "./pages/RedirectPage"; // 새로 만든 컴포넌트
import ProtectedRoute from "./layout/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Auth /> },
      { path: "signup", element: <SignUp /> },
      { path: "home", element: <Home /> },
      { path: "v1/auth/google/callback", element: <RedirectPage /> },

      {
        element: <ProtectedRoute />,
        children: [{ path: "my", element: <Mypage /> }],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
