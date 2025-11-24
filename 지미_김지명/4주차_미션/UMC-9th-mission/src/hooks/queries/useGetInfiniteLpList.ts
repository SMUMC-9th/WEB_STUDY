import { useInfiniteQuery } from "@tanstack/react-query";
import { PAGINATION_ORDER } from "../../enums/common";
import { getLpList } from "../../api/lp";
import { QUERY_KEY } from "../../constants/key";

function useGetInfiniteLpList(
  limit: number,
  search: string,
  order: PAGINATION_ORDER
) {
  return useInfiniteQuery({
    queryFn: ({ pageParam }) =>
      getLpList({ cursor: pageParam, limit, search, order }),
    queryKey: [QUERY_KEY.lps, search, order],
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      console.log(lastPage, allPages);
      return lastPage.data.hasNext ? lastPage.data.nextCursor : undefined;
    },
    // 빈 문자열이나 공백만 있을 때 쿼리 실행 방지
    enabled: search.trim().length > 0 || search === "",

    // 데이터가 신선하다고 간주하는 시간
    staleTime: 1000 * 60 * 5, // 5분

    // 캐시 유지 시간
    gcTime: 1000 * 60 * 10, // 10분
  });
}

export default useGetInfiniteLpList;
