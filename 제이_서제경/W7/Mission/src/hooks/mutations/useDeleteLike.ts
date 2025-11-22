import { isAxiosError } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteLike } from "../../apis/likes";
import { QUERY_KEY } from "../../constants/key";
import type { ResponseLpDto } from "../../types/lp";

type DislikeVars = { lpId: number };

export default function useDeleteLike() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (vars: DislikeVars) => deleteLike(vars),
    retry: false,

    onMutate: async ({ lpId }) => {
      await qc.cancelQueries({ queryKey: [QUERY_KEY.lps, lpId] });

      const prev = qc.getQueryData<ResponseLpDto>([QUERY_KEY.lps, lpId]);
      const me = qc.getQueryData<{ data?: { id?: number | string } }>([
        QUERY_KEY.myInfo,
      ]);
      const userId = me?.data?.id;
      if (!prev || userId == null) return { prev };

      const next: ResponseLpDto = {
        ...prev,
        data: {
          ...prev.data,
          likes: prev.data.likes.filter(
            (l) => String(l.userId) !== String(userId)
          ),
        },
      };
      qc.setQueryData([QUERY_KEY.lps, lpId], next);
      return { prev };
    },

    onError: (err, { lpId }, ctx) => {
      // 404(원래 없던 좋아요)는 성공처럼 취급
      if (isAxiosError(err) && err.response?.status === 404) {
        qc.invalidateQueries({ queryKey: [QUERY_KEY.lps, lpId] });
        return;
      }
      if (ctx?.prev) qc.setQueryData([QUERY_KEY.lps, lpId], ctx.prev);
    },

    onSettled: (_d, _e, { lpId }) => {
      qc.invalidateQueries({ queryKey: [QUERY_KEY.lps, lpId] });
    },
  });
}
