import { useNavigate } from "react-router-dom";
import useLogout from "../hooks/mutations/useLogout";
import useGetMyInfo from "../hooks/queries/useGetMyInfo";
import { useAuth } from "../context/AuthContext";
import { useEffect, useRef, useState } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import useDebounce from "../hooks/useDebounce";

interface NavbarProps {
  onMenuClick: () => void;
}

export default function Navbar({ onMenuClick }: NavbarProps) {
  const nav = useNavigate();
  const { accessToken } = useAuth();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const debouncedSearchValue = useDebounce(searchValue, 500);

  const searchInputRef = useRef<HTMLInputElement>(null);

  const { mutate: logoutUser, isPending } = useLogout();
  const { data: user, isPending: isUserLoading } = useGetMyInfo();

  const handleLogout = async () => {
    logoutUser();
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchValue.trim()) return;

    nav(`/?search=${encodeURIComponent(searchValue)}`);
    // setIsSearchOpen(false);
    setSearchValue("");
  };

  useEffect(() => {
    if (debouncedSearchValue.trim()) {
      nav(`/?search=${encodeURIComponent(debouncedSearchValue)}`);
    }
  }, [debouncedSearchValue, nav]);

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

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

      {isSearchOpen ? (
        <form
          onSubmit={handleSearch}
          className="absoulte inset-x-0 top-0 h-full bg-black flex items-center px-8 z-10"
        >
          <input
            ref={searchInputRef}
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="검색어를 입력하세요"
            className="flex-1 bg-transparent text-white text-lg border-b-2 border-pink-500 focus:outline-none pb-1 mr-4 placeholder-gray-500"
          />
          <button
            type="submit"
            className="text-pink-500 mr-4 hover:text-pink-400"
          >
            <FaSearch size={24} />
          </button>
          <button
            type="button"
            onClick={() => setIsSearchOpen(false)}
            className="text-gray-400 hover:text-white"
          >
            <FaTimes size={24} />
          </button>
        </form>
      ) : (
        <div className="flex flex-row gap-3 items-center">
          {isUserLoading && accessToken ? (
            <div className="text-white text-sm">로딩중...</div>
          ) : user?.name ? (
            <>
              <button
                onClick={() => setIsSearchOpen(true)}
                className="h-18 w-18 text-white p-2 rounded-md cursor-pointer"
              >
                <FaSearch size={20} />
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
      )}
    </div>
  );
}
