import { useState, useEffect } from "react";
import LpCard from "../components/LpCard";
import SkeletonCard from "../components/SkeletonCard";
import useGetLps from "../hooks/useGetLps";
import type { TOrder } from "../constants/enum";
import { useInView } from "react-intersection-observer";

export default function LpList() {
  const [order, setOrder] = useState<TOrder>("desc"); // 최신순: desc, 오래된순: asc
  const [ref, inView] = useInView();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    refetch,
  } = useGetLps({ order, cursor: 0 });

  // 스크롤 끝에 도달하면 다음 페이지 불러오기
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  // 모든 페이지 데이터 합치기
  const lps = data?.pages?.flatMap((page) => page.data) || [];

  return (
    <div className="p-6 mt-24 max-w-7xl mx-auto">
      {/* 정렬 버튼 */}
      <div className="flex gap-2 mb-6 justify-center">
        <button
          className={`px-4 py-2 rounded font-medium border transition-colors duration-200 ${
            order === "desc"
              ? "bg-black text-white border-black"
              : "bg-white text-black border-black"
          }`}
          onClick={() => {
            setOrder("desc");
            refetch();
          }}
        >
          최신순
        </button>
        <button
          className={`px-4 py-2 rounded font-medium border transition-colors duration-200 ${
            order === "asc"
              ? "bg-black text-white border-black"
              : "bg-white text-black border-black"
          }`}
          onClick={() => {
            setOrder("asc");
            refetch();
          }}
        >
          오래된순
        </button>
      </div>

      {/* 상태별 UI */}
      {isLoading && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      )}

      {isError && (
        <div className="flex flex-col items-center mt-10">
          <p className="text-red-500 mb-2">데이터를 불러오지 못했습니다.</p>
          <button
            className="px-4 py-2 bg-black text-white rounded"
            onClick={() => refetch()}
          >
            재시도
          </button>
        </div>
      )}

      {!isLoading && !isError && (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {lps.map((lp) => (
              <LpCard
                key={lp.id}
                id={lp.id}
                title={lp.title}
                thumbnail={lp.thumbnail}
                createdAt={lp.createdAt}
                likes={lp.likes}
              />
            ))}
          </div>

          {/* 무한 스크롤 감지용 div */}
          <div ref={ref} className="h-10 flex justify-center items-center">
            {isFetchingNextPage && <p>불러오는 중...</p>}
          </div>
        </>
      )}
    </div>
  );
}
