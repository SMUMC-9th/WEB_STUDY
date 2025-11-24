import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteLike } from "../../apis/lp";
import { QUERY_KEY } from "../../constants/key";
import type { LpDetailResponse } from "../../types/lp";
import type { ResponseMyInfoDto } from "../../types/authType";

function useDeleteLike() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteLike,

    onMutate: async (lp) => {
      await queryClient.cancelQueries({ queryKey: [QUERY_KEY.lps, lp.lpId] });

      const previousLpPost = queryClient.getQueryData<LpDetailResponse>([
        QUERY_KEY.lps,
        lp.lpId,
      ]);

      const me = queryClient.getQueryData<ResponseMyInfoDto>([
        QUERY_KEY.myInfo,
      ]);
      const userId = Number(me?.data.id);
      if (!previousLpPost || !userId) {
        return { previousLpPost };
      }

      const next: LpDetailResponse = {
        ...previousLpPost,
        data: {
          ...previousLpPost.data,
          likes: previousLpPost.data.likes.filter(
            (like) => like.userId !== userId
          ),
        },
      };

      queryClient.setQueryData([QUERY_KEY.lps, lp.lpId], next);

      return { previousLpPost };
    },

    // 실패하면 롤백
    onError: (_err, lp, context) => {
      if (context?.previousLpPost) {
        queryClient.setQueryData(
          [QUERY_KEY.lps, lp.lpId],
          context.previousLpPost
        );
      }
    },

    // 최신화
    onSettled: (_data, _error, lp) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.lps, lp.lpId] });
    },
  });
}

export default useDeleteLike;
