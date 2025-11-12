import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/auth";

const ProtectedRoute = () => {
  const { isLogged } = useAuth();

  // 아직 로그인 상태를 확인 중일 때는 (예: 비동기 확인 중이라면) 로딩 표시
  // 하지만 지금은 상태가 즉시 결정되므로 생략 가능
  if (!isLogged) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
