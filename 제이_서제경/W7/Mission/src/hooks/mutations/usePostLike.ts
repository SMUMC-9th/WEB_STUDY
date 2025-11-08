import { isAxiosError } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postLike } from "../../apis/likes";
import { QUERY_KEY } from "../../constants/key";
import type { Likes, ResponseLpDto } from "../../types/lp";

type LikeVars = { lpId: number };

export default function usePostLike() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (vars: LikeVars) => postLike(vars),
    retry: false,

    onMutate: async ({ lpId }) => {
      await qc.cancelQueries({ queryKey: [QUERY_KEY.lps, lpId] });

      const prev = qc.getQueryData<ResponseLpDto>([QUERY_KEY.lps, lpId]);
      const me = qc.getQueryData<{ data?: { id?: number | string } }>([
        QUERY_KEY.myInfo,
      ]);
      const userId = me?.data?.id;
      if (!prev || userId == null) return { prev };

      const alreadyMine = prev.data.likes.some(
        (l) => String(l.userId) === String(userId)
      );
      if (alreadyMine) return { prev }; // 이미 좋아요 상태면 캐시 변경 불필요

      const next: ResponseLpDto = {
        ...prev,
        data: {
          ...prev.data,
          likes: [
            ...prev.data.likes,
            { id: -1, userId: Number(userId), lpId } as Likes,
          ],
        },
      };
      qc.setQueryData([QUERY_KEY.lps, lpId], next);
      return { prev };
    },

    onError: (err, { lpId }, ctx) => {
      // 409(이미 좋아요)는 성공처럼 취급: 롤백하지 않고 서버 상태만 동기화
      if (isAxiosError(err) && err.response?.status === 409) {
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
