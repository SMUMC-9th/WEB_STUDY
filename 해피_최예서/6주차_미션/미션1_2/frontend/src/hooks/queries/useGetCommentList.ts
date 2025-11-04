import { useQuery } from "@tanstack/react-query";
import {getCommentList} from "../../apis/comment.ts";

export default function useGetCommentList(lpId: number) {
  return useQuery({
    queryKey: ["comments", lpId],
    queryFn: () => getCommentList(lpId), // getCommentList(lpId)를 호출해서 해당 LP의 댓글 목록을 가져온다.
    enabled: !!lpId, // lpId가 있을 때만 실행
  });
}
// useGetCommentList(lpId)가 호출되면,
// → React Query가 ["comments", lpId]라는 키로 캐시를 찾음.
// 캐시에 없으면 getCommentList(lpId) 실행해서 서버에서 데이터 받아옴.
// 결과를 캐시에 저장하고, 컴포넌트엔 자동으로 data, isLoading, isError 전달.
// 나중에 같은 LP를 열면 서버 안 가고 캐시된 댓글 재사용.
