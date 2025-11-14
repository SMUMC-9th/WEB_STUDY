import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import useLogout from "../hooks/mutations/useLogout";
import useGetMyInfo from "../hooks/queries/useGetMyInfo";
import { useAuth } from "../context/AuthContext";

interface NavbarProps {
  onMenuClick: () => void;
}

export default function Navbar({ onMenuClick }: NavbarProps) {
  const nav = useNavigate();
  const { mutate: logoutUser, isPending } = useLogout();
  const { data: user, isPending: isUserLoading } = useGetMyInfo();
  const { accessToken } = useAuth();
  const handleLogout = async () => {
    logoutUser();
  };

  return (
    <div className="flex flex-row items-center justify-between w-full h-24 px-8 bg-black shadow-lg p-3 flex-shrink-0">
      <div className="flex items-center gap-4">
        <button
          className="h-20 w-20 p-2 rounded-md cursor-pointer lg-hidden hover:text-gray-500 transition"
          onClick={onMenuClick}
        >
          <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="4"
              d="M7.95 11.95h32m-32 12h32m-32 12h32"
            />
          </svg>
        </button>

        <div
          onClick={() => nav("/")}
          className="text-[#FF007F] text-2xl font-bold hover:cursor-pointer hover:text-pink-400 transition"
        >
          돌려돌려 LP판
        </div>
      </div>

      <div className="flex flex-row gap-3 items-center">
        {isUserLoading && accessToken ? (
          <div className="text-white text-sm">로딩중...</div>
        ) : user?.name ? (
          <>
            <button className="h-18 w-18 text-white p-2 rounded-md cursor-pointer">
              <Search />
            </button>
            <span className="text-white font-medium text-lg">
              {user.name}님 반갑습니다.
            </span>
            <button
              onClick={handleLogout}
              disabled={isPending}
              className="px-5 py-2.5 bg-[#FF007F] text-white rounded-md hover:bg-pink-600 transition cursor-pointer"
            >
              로그아웃
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => nav("/login")}
              className="px-5 py-2.5 bg-black text-white border border-white rounded-md hover:bg-gray-900 transition cursor-pointer"
            >
              로그인
            </button>
            <button
              onClick={() => nav("/signup")}
              className="px-5 py-2.5 bg-[#FF007F] text-white rounded-md hover:bg-pink-600 transition cursor-pointer"
            >
              회원가입
            </button>
          </>
        )}
      </div>
    </div>
  );
}
