import { useInfiniteQuery } from "@tanstack/react-query";
import type { PAGINATION_ORDER } from "../../enums/common";
import { QUERY_KEY } from "../../constants/key";
import { getMyLps } from "../../apis/lp";

function useGetMyLps(order: PAGINATION_ORDER) {
  return useInfiniteQuery({
    queryKey: [QUERY_KEY.myLps, order],

    queryFn: ({ pageParam = 0 }) =>
      getMyLps({
        cursor: pageParam,
        order,
        limit: 12,
      }),
    initialPageParam: 0,

    getNextPageParam: (lastPage) => {
      return lastPage.data.hasNext ? lastPage.data.nextCursor : undefined;
    },
  });
}

export default useGetMyLps;
