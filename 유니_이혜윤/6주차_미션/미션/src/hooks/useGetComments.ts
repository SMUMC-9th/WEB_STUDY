import { queryOptions, useInfiniteQuery } from "@tanstack/react-query";
import { getLpComments } from "../apis/lp";
import { type CommentDto } from "../types/common";

export function useGetLpComments({ lpId, order }: CommentDto) {
  return useInfiniteQuery({
    queryKey: ["lpComments", lpId, order],
    queryFn: ({ pageParam = 0 }) =>
      getLpComments({ lpId, cursor: pageParam, order }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.data.hasNext ? lastPage.data.nextCursor : undefined;
    },
    ...queryOptions,
  });
}

export default useGetLpComments;
