import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import useGetInfiniteLpList from "../hooks/queries/useGetInfiniteLpList";
import { PAGINATION_ORDER } from "../enums/common";
import { useInView } from "react-intersection-observer";
import CardSkeleton from "../components/CardSkeleton";
import { FaHeart } from "react-icons/fa";
import LpCreateModal from "../components/LpCreateModal";
import useDebounce from "../hooks/useDebounce";
import useThrottle from "../hooks/useThrottle";

type SortOrder = "newest" | "oldest";

const HomePage = () => {
  const [serachParams] = useSearchParams();
  const querySearch = serachParams.get("search") || "";

  const [search, setSearch] = useState(querySearch);
  const [sortOrder, setSortOrder] = useState<SortOrder>("newest");
  const nav = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    setSearch(querySearch);
  }, [querySearch]);

  const apiOrderValue =
    sortOrder === "newest" ? PAGINATION_ORDER.desc : PAGINATION_ORDER.asc;

  const {
    data,
    isFetchingNextPage,
    hasNextPage,
    isPending,
    fetchNextPage,
    isError,
  } = useGetInfiniteLpList(
    50, // limit
    debouncedSearch,
    apiOrderValue
  );

  const { ref, inView } = useInView({ threshold: 0.1 });

  const throttledInView = useThrottle(inView, 1000);

  // inView상태가 바뀔 때마다 실행됨
  useEffect(() => {
    if (throttledInView && hasNextPage && !isFetchingNextPage) {
      console.log("throttled 다음페이지 API 호출");
      fetchNextPage(); // 다음 페이지 데이터 요청
    }
  }, [throttledInView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isError) {
    return (
      <div className="p-8 text-red-500">
        Error.. 데이터를 불러오는 데 실패했습니다.
      </div>
    );
  }

  const activeStyle =
    "text-white font-semibold border-b-2 border-white pb-1 cursor-pointer transition";
  const inactiveStyle =
    "text-gray-400 hover:text-white cursor-pointer transition";

  return (
    <div className="relative bg-neutral-900 text-white p-8">
      <div className="flex justify-end space-x-4 mb-6">
        <button
          className={sortOrder === "oldest" ? activeStyle : inactiveStyle}
          onClick={() => setSortOrder("oldest")}
        >
          오래된순
        </button>
        <button
          className={sortOrder === "newest" ? activeStyle : inactiveStyle}
          onClick={() => setSortOrder("newest")}
        >
          최신순
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        {isPending
          ? Array.from({ length: 12 }).map((_, i) => (
              <CardSkeleton key={`skel-${i}`} />
            ))
          : data?.pages.map((page, i) => (
              <React.Fragment key={i}>
                {/* page.data.data가 LP[] 배열임 */}
                {page.data.data.map((lp, index) => (
                  <div
                    key={lp.id || index}
                    className="flex flex-col group cursor-pointer"
                    onClick={() => nav(`/lps/${lp.id}`)}
                  >
                    <div className="relative aspect-square w-full bg-neutral-800 rounded-md overflow-hidden shadow-lg transform transition-transform duration-300 group-hover:scale-105">
                      {lp.thumbnail ? (
                        <img
                          src={lp.thumbnail}
                          alt={lp.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-500">
                          [Image]
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black bg-opacity-70 opacity-0 group-hover:opacity-70 transition-opacity duration-300 flex flex-col justify-between p-4 text-white">
                        <div>
                          <h3 className="font-bold text-lg truncate">
                            {lp.title}
                          </h3>
                          <p className="text-sm text-gray-300">
                            {lp.createdAt
                              ? new Date(lp.createdAt).toLocaleDateString()
                              : "날짜 없음"}
                          </p>
                        </div>
                        <div className="text-right font-bold">
                          <FaHeart /> {lp.likes?.length || 0}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </React.Fragment>
            ))}
      </div>

      <div ref={ref} className="mt-6 w-full">
        {isFetchingNextPage && hasNextPage && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <CardSkeleton key={`next-skel-${i}`} />
            ))}
          </div>
        )}
      </div>

      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-10 right-10 w-13 h-13 bg-pink-600 rounded-full flex items-center justify-center text-white text-3xl hover:bg-pink-700 transition-colors cursor-pointer"
        aria-label="새 LP 추가"
      >
        +
      </button>
      <LpCreateModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default HomePage;
