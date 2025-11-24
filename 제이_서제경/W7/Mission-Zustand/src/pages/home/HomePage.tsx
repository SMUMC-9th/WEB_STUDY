import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { PAGINATION_ORDER, type PaginationOrder } from "../../enums/common";
import { SEARCH_DEBOUNCE_DELAY } from "../../constants/delay";

import LpCard from "../../components/LpCard/LpCard";
import LpCardSkeletonList from "../../components/LpCard/LpCardSkeletonList";

import useDebounce from "../../hooks/useDebounce";
import useGetInfiniteLpList from "../../hooks/queries/useGetInfiniteLpList";
import { useThrottle } from "../../hooks/useThrottle";

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [order, setOrder] = useState<PaginationOrder>(PAGINATION_ORDER.ASC);

  const debouncedValue = useDebounce(search, SEARCH_DEBOUNCE_DELAY);

  const { ref, inView } = useInView({ threshold: 0 });
  const throttledInView = useThrottle(inView, 3000);

  const {
    data: lps,
    isFetching,
    hasNextPage,
    fetchNextPage,
    isLoading,
    isError,
  } = useGetInfiniteLpList(50, debouncedValue, order);

  useEffect(() => {
    if (throttledInView && !isFetching && hasNextPage) {
      console.log(
        "[Throttle] fetchNextPage triggered:",
        new Date().toISOString()
      );
      fetchNextPage();
    }
  }, [throttledInView, isFetching, hasNextPage, fetchNextPage]);

  if (isLoading) return <div className="mt-20">isLoading...</div>;
  if (isError) return <div className="mt-20">isError...</div>;

  const ORDER_LABEL = {
    [PAGINATION_ORDER.ASC]: "오래된 순",
    [PAGINATION_ORDER.DESC]: "최신순",
  };

  return (
    <div className="container mx-auto px-4 py-6 pt-16">
      <section className="flex flex-row justify-between items-center mb-4">
        <input
          value={search}
          placeholder="검색어를 입력하세요"
          onChange={(e) => setSearch(e.target.value)}
          className="px-5 w-100 h-10 border border-blue-600 rounded-full outline-none"
        />

        <div className="inline-flex rounded-lg overflow-hidden border border-white ml-4">
          {Object.values(PAGINATION_ORDER).map((value) => (
            <button
              key={value}
              onClick={() => setOrder(value)}
              className={`w-[100px] py-2 text-sm font-semibold transition-colors duration-200
                ${
                  order === value
                    ? "bg-blue-600 text-white"
                    : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                }`}
            >
              {ORDER_LABEL[value]}
            </button>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {lps?.pages
          ?.map((page) => page.data.data)
          ?.flat()
          ?.map((lp) => (
            <LpCard key={lp.id} lp={lp} />
          ))}

        {isFetching && <LpCardSkeletonList count={20} />}
      </div>

      {/* 스크롤 트리거!! */}
      <div ref={ref} className="h-2" />
    </div>
  );
}
