import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteLpComment } from "../../apis/lp";
import { QUERY_KEY } from "../../constants/key";

export default function useDeleteComment(lpId: number, order: "desc" | "asc") {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ commentId }: { commentId: number }) =>
      deleteLpComment({ lpId, commentId }),

    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [QUERY_KEY.lpComments, lpId, order] });
    },
  });
}
