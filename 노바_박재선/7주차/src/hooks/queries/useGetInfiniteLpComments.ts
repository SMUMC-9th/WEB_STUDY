//해당 LP의 댓글 목록을 무한 스크롤로 가져오기.

import { useInfiniteQuery } from "@tanstack/react-query";
import type { PAGINATION_ORDER } from "../../enums/common";
import { QUERY_KEY } from "../../constants/key";
import { getLpComments } from "../../apis/comment";

function useGetInfiniteLpComments(lpid: string, order: PAGINATION_ORDER) {
  return useInfiniteQuery({
    queryKey: [QUERY_KEY.comment, lpid, order],

    //pageParam은 getNextPageParam에서 반환된 nextCursor값임.
    queryFn: ({ pageParam = 0 }) =>
      getLpComments(lpid, { cursor: pageParam, order, limit: 20 }),
    //한번에 20개씩 load되도록 설정
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.data.hasNext ? lastPage.data.nextCursor : undefined;
    },
  });
}

export default useGetInfiniteLpComments;
