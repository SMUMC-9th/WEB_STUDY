import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import HamburgerButton from "./HamburgerButton";
import Sidebar from "./Sidebar";
import { useMutation, QueryClient } from "@tanstack/react-query";
import { logout, withdraw } from "../api/auth";
import { useAuthStore } from "../context/useAuthStore";

export default function Navbar() {
  const navigate = useNavigate();
  const { isLogged, user, setIsLogged } = useAuthStore();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  const qlient = new QueryClient();

  // 로그아웃 뮤테이션
  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
      setIsLogged(false);
      qlient.clear();
      navigate("/");
    },
  });
  // 탈퇴 뮤테이션
  const withdrawMutation = useMutation({
    mutationFn: withdraw,
    onSuccess: () => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
      setIsLogged(false);
      qlient.clear();
      navigate("/");
    },
  });

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
                onClick={() => logoutMutation.mutate()}
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

      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onOpenModal={() => setIsDeleteModalOpen(true)}
      />

      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[1000]">
          <div className="bg-neutral-800 text-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h3 className="text-lg font-bold mb-4">정말 탈퇴하시겠습니까?</h3>
            <p className="mb-6">
              탈퇴하시면 모든 데이터가 삭제되며, 복구할 수 없습니다.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-500"
              >
                취소
              </button>
              <button
                onClick={() => {
                  setIsDeleteModalOpen(false);
                  alert("탈퇴되었습니다.");
                  withdrawMutation.mutate();
                }}
                className="px-4 py-2 bg-pink-500 rounded hover:bg-pink-400"
              >
                탈퇴하기
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
