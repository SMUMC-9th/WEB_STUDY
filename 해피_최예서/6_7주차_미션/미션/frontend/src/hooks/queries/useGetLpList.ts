// useGetLpList.ts
import { useQuery } from "@tanstack/react-query";
import type { PaginationDto } from "../../types/common.ts";
import { getLpList } from "../../apis/lp.ts";
import { QUERY_KEY } from "../../constants/key.ts";

function useGetLpList({ cursor, search, order, limit }: PaginationDto) {
  return useQuery({
    queryKey: [QUERY_KEY.lps, search, order, cursor, limit],
    queryFn: () =>
      getLpList({
        cursor,
        search,
        order,
        limit,
      }),

    // 캐싱
    staleTime: 1000 * 60 * 5, // 5m 동안 신선한 데이터로 간주
    cacheTime: 1000 * 60 * 10, // 10m 동안 캐시에 유지

    select: (data) => data.data.data, // API 응답 중 필요한 데이터만 가공해서 리턴하는 옵션
  });
}

export default useGetLpList;
