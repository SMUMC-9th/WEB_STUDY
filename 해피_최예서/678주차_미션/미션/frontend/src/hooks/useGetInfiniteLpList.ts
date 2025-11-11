import { useInfiniteQuery } from "@tanstack/react-query";
import { getLpList } from "../apis/lp.ts";
import { QUERY_KEY } from "../constants/key.ts";

// 무한 스크롤용 LP 리스트 훅
function useGetInfiniteLpList(
  limit:number,
  search:string,
  order:"asc" | "desc",
) {
  return useInfiniteQuery({
    // 쿼리 실행 함수: pageParam을 커서로 사용
    queryFn: ({ pageParam }: { pageParam: number }) =>
      getLpList({ cursor: pageParam, limit, search, order }),

    // 쿼리 키: 캐싱용 식별자
    queryKey: [QUERY_KEY.lps, search, order],

    // 초기 커서값
    initialPageParam: 0,

    // 다음 페이지 커서 계산 로직
    getNextPageParam: (lastPage) => {
      return lastPage.data.hasNext ? lastPage.data.nextCursor : undefined;
    },

    // 빈 문자열 / 공백이면 요청 막음
    // enabled: 쿼리 실행 여부를 제어하는 옵션 (특정 조건일 때만 요청 보내고 싶을 때 사용)
    // ?????
    enabled: search.trim() === "" || search.trim().length > 0
  });
}

export default useGetInfiniteLpList;
