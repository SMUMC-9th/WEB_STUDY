import { useInfiniteQuery } from "@tanstack/react-query";

import { QUERY_KEY } from "../../constants/key";

import type { ResponseLpListDto } from "../../types/lp";
import type { PaginationOrder } from "../../enums/common";
import { getLPList } from "../../apis/lp";

function useGetInfiniteLpList(
  limit: number,
  search: string,
  order: PaginationOrder
) {
  return useInfiniteQuery({
    queryFn: ({ pageParam }) =>
      getLPList({ cursor: pageParam, limit, search, order }),
    queryKey: [QUERY_KEY.lps, search, order],
    initialPageParam: 0,
    getNextPageParam: (lastPage: ResponseLpListDto) => {
      return lastPage.data.hasNext ? lastPage.data.nextCursor : undefined;
    },
    // enabled: search.trim().length > 0, // 검색어 비어있으면 쿼리 실행 X

    staleTime: 1000 * 30,
    gcTime: 1000 * 60 * 5,
  });
}

export default useGetInfiniteLpList;

//limit - 한 번에 가져올 데이터 개수
//search - 검색어
//order - 정렬순서
