import { useInfiniteQuery } from "@tanstack/react-query";
import { getMeLikes } from "../../apis/likes";
import { QUERY_KEY } from "../../constants/key";
import type { Lp, ResponseLpListDto } from "../../types/lp";
import type { CursorBasedResponse } from "../../types/common";

export default function useGetMyLikedLps(limit = 12) {
  return useInfiniteQuery<CursorBasedResponse<Lp[]>>({
    queryKey: [QUERY_KEY.meLikes, limit],
    queryFn: ({ pageParam = 0 }) =>
      getMeLikes({
        cursor: pageParam as number,
        limit,
        search: "",
        order: "desc",
      }),
    initialPageParam: 0,
    getNextPageParam: (last: ResponseLpListDto) =>
      last.data.hasNext ? last.data.nextCursor! : undefined,
    staleTime: 30 * 1000,
  });
}
