import { useInfiniteQuery } from "@tanstack/react-query";
import { type PaginationDto } from "../types/common";
import { getLpList } from "../apis/lp";

function useGetLpList({ order }: PaginationDto) {
  return useInfiniteQuery({
    queryKey: ["lps", order],
    queryFn: ({ pageParam = 0 }) => getLpList({ cursor: pageParam, order }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.data.hasNext ? lastPage.data.nextCursor : undefined;
    },
  });
}

export default useGetLpList;
