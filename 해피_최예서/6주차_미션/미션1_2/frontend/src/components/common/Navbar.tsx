import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/context.tsx";
import { useQuery } from "@tanstack/react-query";
import { getMyInfo } from "../../apis/auth.ts";
import { useRef, useState, useEffect } from "react";
import Sidebar from "./Sidebar.tsx";

export default function Navbar() {
  const { isLogin } = useAuth();
  const [open, setOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  // 로그인 상태일 때만 유저정보 요청
  const { data, isLoading } = useQuery({
    queryKey: ["myInfo"],
    queryFn: getMyInfo,
    enabled: isLogin,
  });

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    window.location.href = "/signin";
  };

  // 사이드바 외부 클릭 시 닫히게 하는 로직
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const target = e.target as Node;
      const burgerBtn = document.getElementById("burger-btn");

      // 사이드바 영역도 아니고, 햄버거 버튼도 아니면 닫기
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(target) &&
        burgerBtn &&
        !burgerBtn.contains(target)
      ) {
        setOpen(false);
      }
    }


    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <>
      {/* 네비게이션 바 */}
      <div className="flex p-2 justify-between bg-[#3086d9] text-white relative z-50">
        <div className="flex items-center space-x-2">
          {/* 햄버거 버튼 */}
          <button
            id="burger-btn"
            onClick={(e) => {
              e.stopPropagation(); // 클릭 이벤트 버블링 차단
              setOpen((prev) => !prev);
            }}
            className="text-white cursor-pointer"
            aria-label="Toggle sidebar"
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 48 48"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="4"
                d="M7.95 11.95h32m-32 12h32m-32 12h32"
              />
            </svg>
          </button>

          <NavLink to="/" className="text-white font-semibold text-lg">
            돌려돌려 LP판
          </NavLink>
        </div>

        <div className="flex items-center space-x-4">
          {isLogin ? (
            <>
              {isLoading ? (
                <div>로딩중...</div>
              ) : (
                <div>{data?.data.name}님 반갑습니다.</div>
              )}
              <button
                onClick={handleLogout}
                className="bg-[#fbb411] px-3 py-1.5 rounded-md text-black font-medium"
              >
                로그아웃
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/signin"
                className={({ isActive }) =>
                  isActive
                    ? "px-3 py-1.5 bg-[#fbb411] rounded-xl text-black"
                    : "px-3 py-2"
                }
              >
                로그인
              </NavLink>
              <NavLink
                to="/signup"
                className={({ isActive }) =>
                  isActive
                    ? "px-3 py-1.5 bg-[#fbb411] rounded-xl text-black"
                    : "px-3 py-2"
                }
              >
                회원가입
              </NavLink>
            </>
          )}
        </div>
      </div>

      {/* 오버레이 (사이드바 열렸을 때만) */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40 md:hidden"
          onClick={(e) => {
            e.stopPropagation();
            setOpen(false); // 클릭 시 닫기
          }}
        />
      )}

      {/* 사이드바 */}
      <Sidebar ref={sidebarRef} open={open} />
    </>
  );
}
