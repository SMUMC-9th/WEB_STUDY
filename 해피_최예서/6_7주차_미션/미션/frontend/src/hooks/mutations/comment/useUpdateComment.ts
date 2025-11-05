import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../../App.tsx";
import { QUERY_KEY } from "../../../constants/key.ts";
import { updateComment } from "../../../apis/comment.ts";
import type { RequestCommentUpdateDto } from "../../../types/comment.ts";

export default function useUpdateComment() {
  return useMutation({
    mutationFn: ({
      lpId,
      commentId,
      body,
    }: {
      lpId: number;
      commentId: number;
      body: RequestCommentUpdateDto;
    }) => updateComment(lpId, commentId, body),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.comment, variables.lpId],
      });
    },

    onError: (error) => {
      console.error("댓글 수정 실패:", error);
      alert("댓글 수정 중 오류 발생");
    },
  });
}

// variables: mutate() 호출할 때 넘긴 요청 데이터
