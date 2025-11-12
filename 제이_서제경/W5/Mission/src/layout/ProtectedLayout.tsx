import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedLayout = () => {
  const { accessToken } = useAuth();

  // 사용자가 로그인하지 않은 경우, 인증이 필요한 페이지에 접근 시 로그인 페이지로 Redirect 처리
  if (!accessToken) {
    return <Navigate to={"/login"} replace />;
  }

  return <Outlet />;
};

export default ProtectedLayout;
