import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import Sidebar from "./Sidebar";
import { Menu } from "lucide-react";

const Header = () => {
  const navigate = useNavigate();
  const { accessToken, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <>
      <nav className="h-[60px] w-full fixed top-0 bg-white flex justify-between items-center px-6 border-b border-gray-200 z-50">
        <div
          onClick={() => navigate("/")}
          className="text-xl font-bold cursor-pointer"
        >
          🌀 Spinning Meow
        </div>

        <div className="flex gap-1 text-xs">
          {!accessToken ? (
            <>
              <button
                onClick={() => navigate("/login")}
                className="px-3 py-2 rounded-md hover:bg-gray-100 transition-colors cursor-pointer"
              >
                로그인
              </button>
              <button
                onClick={() => navigate("/signup")}
                className="px-3 py-2 rounded-md hover:bg-gray-100 transition-colors cursor-pointer"
              >
                회원가입
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate("/my")}
                className="px-3 py-2 rounded-md hover:bg-gray-100 transition-colors cursor-pointer"
              >
                마이페이지
              </button>
              <button
                onClick={handleLogout}
                className="px-3 py-2 rounded-md hover:bg-gray-100 transition-colors cursor-pointer"
              >
                로그아웃
              </button>

              <button
                onClick={() => setSidebarOpen(true)}
                aria-label="사이드바 열기"
                className="ml-1 p-2 rounded-md hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <Menu />
              </button>
            </>
          )}
        </div>
      </nav>
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </>
  );
};

export default Header;
