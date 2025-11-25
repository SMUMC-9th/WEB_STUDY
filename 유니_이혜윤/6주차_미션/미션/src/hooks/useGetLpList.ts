import { useInfiniteQuery } from "@tanstack/react-query";
import { type PaginationDto } from "../types/common";
import { getLpList } from "../apis/lp";

function useGetLpList({ order, search }: PaginationDto) {
  return useInfiniteQuery({
    queryKey: ["lps", order, search ?? ""],
    queryFn: ({ pageParam = 0 }) =>
      getLpList({ cursor: pageParam, order, search }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) =>
      lastPage.data.hasNext ? lastPage.data.nextCursor : undefined,
    staleTime: 60_000,
    gcTime: 5 * 60_000,
  });
}

export default useGetLpList;
