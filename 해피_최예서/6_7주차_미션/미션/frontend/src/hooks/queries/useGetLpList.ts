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
    staleTime: 1000 * 60 * 5, // 5m
    : 100 * 60 * 10, // 10m

    select: (data) => data.data.data,
  });
}

export default useGetLpList;
