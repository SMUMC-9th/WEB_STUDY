import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateLpComment } from "../../apis/lp";
import { QUERY_KEY } from "../../constants/key";

export default function useUpdateComment(lpId: number, order: "desc" | "asc") {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({
      commentId,
      content,
    }: {
      commentId: number;
      content: string;
    }) => updateLpComment({ lpId, commentId, body: { content } }),

    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [QUERY_KEY.lpComments, lpId, order] });
    },
  });
}
