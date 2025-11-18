import { useInfiniteQuery } from "@tanstack/react-query";
import { getLpList } from "../../apis/lp";
import type { PAGINATION_ORDER } from "../../enums/common";
import { QUERY_KEY } from "../../constants/key";

function useGetInfiniteLpList(
  limit: number,
  debouncedSearch: string,
  order: PAGINATION_ORDER
) {
  return useInfiniteQuery({
    queryFn: ({ pageParam }) =>
      getLpList({ cursor: pageParam, limit, search: debouncedSearch, order }),
    queryKey: [QUERY_KEY.lps, debouncedSearch, order],
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.data.hasNext ? lastPage.data.nextCursor : undefined;
    },

    // enabled: debouncedSearch.trim().length > 0,

    staleTime: 5 * 60 * 1000, //5분동안 fresh상태유지
    gcTime: 10 * 60 * 1000, //10분동안 캐시 유지
  });
}

export default useGetInfiniteLpList;
