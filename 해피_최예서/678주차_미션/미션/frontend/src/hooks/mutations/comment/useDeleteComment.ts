import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../../App.tsx";
import { QUERY_KEY } from "../../../constants/key.ts";
import { deleteComment } from "../../../apis/comment.ts";
import type { DeleteCommentDto } from "../../../types/comment.ts";

export default function useDeleteComment() {
  return useMutation<
    DeleteCommentDto,
    Error,
    { lpId: number; commentId: number }
  >({
    mutationFn: ({ lpId, commentId }) => deleteComment(lpId, commentId),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.comment, variables.lpId],
      });
      alert("댓글이 삭제되었습니다.");
    },

    onError: (error) => {
      console.error("댓글 삭제 실패:", error);
      alert("댓글 삭제 중 오류가 발생했습니다.");
    },
  });
}
