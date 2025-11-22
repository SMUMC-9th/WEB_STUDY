import { queryOptions, useInfiniteQuery } from "@tanstack/react-query";
import type { TOrder } from "../constants/enum";
import { getComment } from "../api/lp";
type TGetCommetRequest = {
  order: TOrder;
  cursor: number;
  lpId: number;
};

export default function useGetComment({ order, lpId }: TGetCommetRequest) {
  return useInfiniteQuery({
    queryKey: ["getComments", order, lpId],
    queryFn: async ({ pageParam }) =>
      getComment({ order, cursor: pageParam, lpId }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.data.hasNext ? lastPage.data.nextCursor : undefined;
    },
    ...queryOptions,
  });
}
