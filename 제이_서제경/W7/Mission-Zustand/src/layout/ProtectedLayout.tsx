import { Navigate, Outlet } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { useState } from "react";
import { Sidebar } from "../components/layout/Sidebar";
import { useAuthStore } from "../stores/authStore";

const ProtectedLayout = () => {
  const accessToken = useAuthStore((s) => s.accessToken);
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
