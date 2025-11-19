// 댓글 포스트

import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../../App.tsx";
import { QUERY_KEY } from "../../../constants/key.ts";
import { postComment } from "../../../apis/comment.ts";

export default function usePostComment() {
  return useMutation({
    mutationFn: ({ lpId, body }: { lpId: number; body: { content: string } }) =>
      postComment(lpId, body),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.comment, variables.lpId],
      });
    },
    onError: (error) => {
      console.log("댓글 등록 실패", error);
      alert("댓글 등록 실패");
    },
  });
}
