import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Header from "../components/Header";

const ProtectedLayout = () => {
  const { accessToken } = useAuth();

  if (!accessToken) {
    alert("로그인이 필요한 서비스입니다. 로그인을 해주세요!");
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="h-dvh flex flex-col">
      <header className="h-[60px] flex-shrink-0">
        <Header />
      </header>
      <main className="flex-1 bg-gray-50">
        <Outlet />
      </main>
    </div>
  );
};

export default ProtectedLayout;
