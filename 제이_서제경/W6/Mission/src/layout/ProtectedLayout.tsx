import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { useState } from "react";
import { Sidebar } from "../components/layout/Sidebar";

const ProtectedLayout = () => {
  const { accessToken } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // 사용자가 로그인하지 않은 경우, 인증이 필요한 페이지에 접근 시 로그인 페이지로 Redirect 처리
  if (!accessToken) {
    return <Navigate to={"/login"} replace />;
  }

  return (
    <div className="h-dvh flex flex-col">
      <Header setSidebarOpen={setSidebarOpen} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main
        className={`transition-all duration-300 flex-1 px-4 pt-4 ${
          sidebarOpen ? "pl-64" : ""
        }`}
      >
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default ProtectedLayout;
