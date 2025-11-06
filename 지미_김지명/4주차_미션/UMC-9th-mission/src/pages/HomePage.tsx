import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import { getMyInfo } from "../api/auth";
import axios from "axios";
import useGetInfiniteLpList from "../hooks/queries/useGetInfiniteLpList";
import { PAGINATION_ORDER } from "../enums/common";
import LpCard from "../components/LpCard/LpCard";
import LpCardSkeletonList from "../components/LpCard/LpCardSkeletosList";
import Sidebar from "../components/\bSidebar";
import FloatingAddButton from "../components/FloatingAddButton";
import LpCreationModal from "../components/LpCreationModal";

const HomePage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [search, setSearch] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // LP 목록 가져오기
  const {
    data: lps,
    isFetching,
    hasNextPage,
    isPending,
    fetchNextPage,
    isError,
  } = useGetInfiniteLpList(50, search, PAGINATION_ORDER.desc);

  // react-intersection-observer 사용
  const { ref: observerRef, inView } = useInView({
    threshold: 0.1,
  });

  // inView가 true가 되면 다음 페이지 로드
  useEffect(() => {
    if (inView && hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetching, fetchNextPage]);

  // 인증 체크
  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = localStorage.getItem(LOCAL_STORAGE_KEY.accessToken);

      if (!token) {
        setIsLoggedIn(false);
        setIsCheckingAuth(false);
        return;
      }

      try {
        await getMyInfo();
        setIsLoggedIn(true);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          setIsLoggedIn(false);
          localStorage.removeItem(LOCAL_STORAGE_KEY.accessToken);
        }
      } finally {
        setIsCheckingAuth(false);
      }
    };

    checkAuthStatus();
  }, []);

  const handleAddClick = () => {
    if (!isLoggedIn) {
      alert("로그인이 필요한 서비스입니다.");
      return;
    }
    setIsModalOpen(true);
  };

  // 조건부 return은 모든 hooks 아래에
  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen bg-black">
        <div className="text-white text-2xl">Error...</div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-black">
      {/* 사이드바 */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      {/* 메인 컨텐츠 */}
      <div className="flex-1 flex flex-col items-center gap-6 p-6">
        {/* 버거 버튼 (모바일에서만 표시) */}
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="lg:hidden fixed top-24 left-4 z-30 p-2 bg-gray-900 rounded-md text-white hover:bg-gray-800 transition"
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

        <p className="text-white text-8xl">돌려돌려 LP판</p>

        {/* LP 목록 표시 */}
        <div className="mt-20 w-full max-w-6xl">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="text-black p-3 w-full mb-6 rounded-lg bg-white border border-gray-300"
            placeholder="LP 검색..."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {isPending && <LpCardSkeletonList count={20} />}
            {/* 실제 LP 카드 렌더링 */}
            {lps?.pages
              ?.map((page) => page.data.data)
              ?.flat()
              ?.map((lp) => (
                <LpCard
                  key={lp.id}
                  id={lp.id}
                  title={lp.title}
                  thumbnail={lp.thumbnail}
                  createdAt={lp.createdAt}
                  likesCount={lp.likes?.length || 0}
                />
              ))}

            {/* 로딩 중일 때 스켈레톤 UI 표시 */}
            {isFetching && <LpCardSkeletonList count={20} />}
          </div>

          {/* 무한 스크롤 트리거 */}
          <div ref={observerRef} className="mt-8 flex justify-center h-20">
            {isFetching && <div className="text-white">Loading...</div>}
          </div>
        </div>
      </div>

      <FloatingAddButton onClick={handleAddClick} />

      <LpCreationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default HomePage;
