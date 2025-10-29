import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import { getMyInfo } from "../api/auth";
import axios from "axios";
import useGetInfiniteLpList from "../hooks/queries/useGetInfiniteLpList";
import { PAGINATION_ORDER } from "../enums/common";
import LpCard from "../components/LpCard/LpCard";
import LpCardSkeletonList from "../components/LpCard/LpCardSkeletosList";

const HomePage = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [search, setSearch] = useState("");

  // LP 목록 가져오기
  const { data: lps, isFetching, hasNextPage, isPending, fetchNextPage, isError } = 
    useGetInfiniteLpList(50, search, PAGINATION_ORDER.desc);

  // ref로 마지막 요소 감지
  const observerTarget = useRef<HTMLDivElement>(null);

  // Intersection Observer 직접 사용
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetching) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [hasNextPage, isFetching, fetchNextPage]);

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

  // 조건부 return은 모든 hooks 아래에
  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen bg-black">
        <div className="text-white text-2xl">Error...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-black gap-6 p-6">
      <p className="text-white text-8xl">돌려돌려 LP판</p>
      
      {isLoggedIn && (
        <div className="flex flex-col items-center gap-4">
          <p className="text-white text-2xl">로그인 되었습니다!</p>
          <button 
            onClick={() => navigate('/my')}
            className="px-6 py-3 bg-[#FF007F] text-white text-lg rounded-md hover:bg-pink-600 transition cursor-pointer">
            마이페이지 가기
          </button>
        </div>
      )}

      {/* LP 목록 표시 */}
      <div className="mt-20 w-full max-w-6xl">
        <input 
          value={search} 
          onChange={(e) => setSearch(e.target.value)} 
          className="text-black p-3 w-full mb-6 rounded-lg bg-white border border-gray-300"
          placeholder="LP 검색..."
        />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {isPending && <LpCardSkeletonList count={20}/>}
          {/* 실제 LP 카드 렌더링 */}
          {lps?.pages
            ?.map((page) => page.data.data)
            ?.flat()
            ?.map((lp) => (
              <LpCard key={lp.id} id={lp.id} title={lp.title} thumbnail={lp.thumbnail} />
            ))
          }
          
          {/* 로딩 중일 때 스켈레톤 UI 표시 */}
          {isFetching && <LpCardSkeletonList count={20} />}
        </div>
        
        {/* 무한 스크롤 트리거 */}
        <div ref={observerTarget} className="mt-8 flex justify-center h-20">
          {isFetching}
        </div>
      </div>
    </div>
  );
}

export default HomePage;