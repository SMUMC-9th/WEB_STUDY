import { useEffect, useState } from "react";
import useGetInfiniteLpList from "../../hooks/queries/useGetInfiniteLpList";
import { useInView } from "react-intersection-observer";
import { PAGINATION_ORDER, type PaginationOrder } from "../../enums/common";
import LpCard from "../../components/LpCard/LpCard";
import LpCardSkeletonList from "../../components/LpCard/LpCardSkeletonList";

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [order, setOrder] = useState<PaginationOrder>(PAGINATION_ORDER.ASC);

  // 커스텀 훅: useInfiniteQuery 기반으로 LP 리스트를 불러옴
  // useGetInfiniteLpList(limit, search, order)
  // - limit: 한 페이지당 불러올 개수
  // - search: 검색 키워드
  // - order: 정렬 순서 (ASC or DESC)
  const {
    data: lps, // 전체 페이지 데이터 (pages 배열 형태)
    isFetching, // "요청 중" 상태 (fetchNextPage 포함)
    hasNextPage, // 다음 페이지가 존재하는지 여부
    fetchNextPage, // 다음 페이지 데이터를 불러오는 함수
    isLoading, //처음 데이터를 불러올 때만 true
    isError, // 요청 실패 시 true
  } = useGetInfiniteLpList(50, search, order);

  // useInView: 특정 DOM 요소가 뷰포트 안에 들어왔는지 감지
  // threshold: 0 → 요소가 1픽셀이라도 화면에 들어오면 true
  const { ref, inView } = useInView({ threshold: 0 });

  // 무한 스크롤 구현 핵심 로직
  // inView가 true일 때 = 스크롤이 마지막 부분에 도달했을 때
  // - 아직 데이터 요청 중이 아니고
  // - 다음 페이지가 존재한다면
  // fetchNextPage()로 다음 데이터를 요청한다.
  useEffect(() => {
    if (inView && !isFetching && hasNextPage) {
      fetchNextPage(); // 다음 페이지 데이터 요청
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);

  // 로딩/에러 상태 처리
  if (isLoading) return <div className="mt-20">isLoading...</div>;
  if (isError) return <div className="mt-20">isError...</div>;

  // 버튼 텍스트 맵핑
  const ORDER_LABEL = {
    [PAGINATION_ORDER.ASC]: "오래된 순",
    [PAGINATION_ORDER.DESC]: "최신순",
  };

  return (
    <div className="container mx-auto px-4 py-6 pt-16">
      {/* 검색창 UI 추가 예정 */}
      {/* 정렬 버튼 */}
      <div className="flex justify-end w-full mb-4">
        <div className="inline-flex rounded-lg overflow-hidden border border-white">
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
      </div>

      {/* LP 카드 리스트 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {lps?.pages
          ?.map((page) => page.data.data)
          ?.flat()
          ?.map((lp) => (
            <LpCard key={lp.id} lp={lp} />
          ))}
        {isFetching && <LpCardSkeletonList count={20} />}
      </div>
      <div ref={ref} className="h-2" />
    </div>
  );
}
