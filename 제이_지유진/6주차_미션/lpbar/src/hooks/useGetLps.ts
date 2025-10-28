import { queryOptions, useInfiniteQuery } from "@tanstack/react-query";
import type { TOrder } from "../constants/enum";
import type { TGetLPResponse } from "../types/lp";
import { getLP } from "../api/lp";

type TGetLPsRequest = {
  order: TOrder;
  cursor: number;
};

function useGetLps({ order }: TGetLPsRequest) {
  return useInfiniteQuery<
    TGetLPResponse,
    Error,
    TGetLPResponse,
    string[],
    number
  >({
    queryKey: ["getLPs", order],
    queryFn: async ({ pageParam }) => getLP({ order, cursor: pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.data.hasNext ? lastPage.data.nextCursor : undefined;
    },
    ...queryOptions,
  });
}

export default useGetLps;
