import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Sidebar from "./Sidebar";
import { Menu } from "lucide-react";
import useGetMyInfo from "../hooks/useGetMyInfo";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "../constants/key";
import useSidebar from "../hooks/useSidebar";

const Header = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { accessToken, logout } = useAuth();

  const { open, closeSidebar, toggleSidebar } = useSidebar({
    defaultOpen: false,
    lockScroll: true,
    closeOnEsc: true,
    closeOnRouteChange: true,
  });

  const { data: my } = useGetMyInfo(!!accessToken);
  const userName = my?.data?.name;

  const handleLogout = async () => {
    await logout();
    queryClient.removeQueries({ queryKey: [QUERY_KEY.myInfo] });
    navigate("/");
  };

  return (
    <>
      <nav className="h-[60px] w-full fixed top-0 bg-white flex justify-between items-center px-6 border-b border-gray-200 z-50">
        <div
          onClick={() => navigate("/")}
          className="text-xl font-bold cursor-pointer select-none"
        >
          🌀 Spinning Meow
        </div>

        <div className="flex items-center gap-1 text-xs">
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
              <span
                className="px-3 py-2 rounded-md text-gray-700 hidden sm:inline-block"
                title="마이페이지로 이동"
                onClick={() => navigate("/my")}
                role="button"
              >
                {userName ? `${userName}님 환영합니다 😀` : "환영합니다"}
              </span>

              <button
                onClick={handleLogout}
                className="px-3 py-2 rounded-md hover:bg-gray-100 transition-colors cursor-pointer"
              >
                로그아웃
              </button>

              <button
                onClick={toggleSidebar}
                aria-label="사이드바 열기"
                className="ml-1 p-2 rounded-md hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <Menu />
              </button>
            </>
          )}
        </div>
      </nav>
      <Sidebar open={open} onClose={closeSidebar} />
    </>
  );
};

export default Header;
