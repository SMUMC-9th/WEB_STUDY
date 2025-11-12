import { useInfiniteQuery } from "@tanstack/react-query";
import { PAGINATION_ORDER } from "../../enums/common";
import { getCommentList } from "../../api/comment";
import { QUERY_KEY } from "../../constants/key";

function useGetInfiniteCommentList(
  lpId: number,
  limit: number,
  order: PAGINATION_ORDER = PAGINATION_ORDER.desc
) {
  return useInfiniteQuery({
    queryKey: [QUERY_KEY.comments, lpId, order],
    queryFn: ({ pageParam }) =>
      getCommentList(lpId, { cursor: pageParam, limit, order }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.data.hasNext ? lastPage.data.nextCursor : undefined;
    },
    enabled: !!lpId, // lpId가 있을 때만 실행
  });
}

export default useGetInfiniteCommentList;
