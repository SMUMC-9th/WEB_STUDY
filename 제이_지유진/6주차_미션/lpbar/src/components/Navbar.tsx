import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";
import { Search } from "lucide-react";
import HamburgerButton from "./HamburgerButton";
import Sidebar from "./Sidebar";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { isLogged, setIsLogged } = useAuth();
  const { user } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.setItem("manualLogout", "true");
    setIsLogged(false);
    navigate("/");
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-full flex p-4 justify-between items-center bg-neutral-800 text-center z-50 shadow-md">
        <div className="flex items-center gap-3">
          {isLogged && (
            <HamburgerButton onClick={() => setIsSidebarOpen(true)} />
          )}

          <Link to={isLogged ? "/home" : "/"}>
            <h1 className="text-3xl text-pink-500 font-bold">돌려돌려 LP판</h1>
          </Link>
        </div>

        <div className="flex gap-2 text-white">
          {isLogged ? (
            <div className="flex items-center gap-4">
              {isLogged && user && (
                <div className="flex items-center gap-2">
                  <Search size={20} />
                  <span className="font-medium text-white">
                    {user.name}님, 안녕하세요?
                  </span>
                </div>
              )}

              <button
                className="bg-red-500 py-1 rounded-[10px] w-[80px] hover:bg-red-400"
                onClick={handleLogout}
              >
                로그아웃
              </button>
            </div>
          ) : (
            <>
              <button
                className="bg-black py-1 rounded-[10px] w-[80px] hover:bg-black/50"
                onClick={() => navigate("/")}
              >
                로그인
              </button>
              <button
                className="bg-pink-500 py-1 rounded-[10px] w-[80px] hover:bg-pink-400"
                onClick={() => navigate("/signup")}
              >
                회원가입
              </button>
            </>
          )}
        </div>
      </div>

      {/* 사이드바 */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </>
  );
};

export default Navbar;
