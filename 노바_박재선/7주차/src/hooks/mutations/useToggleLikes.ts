import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleLpLikes } from "../../apis/lp";
import { QUERY_KEY } from "../../constants/key";
import type { ResponseLpDetailDto } from "../../types/lp";
import useGetMyInfo from "../queries/useGetMyInfo";

const useToggleLike = () => {
  const queryClient = useQueryClient();
  const { data: myInfo } = useGetMyInfo();

  return useMutation({
    mutationFn: ({ lpid, isLiked }: { lpid: string; isLiked: boolean }) =>
      toggleLpLikes(lpid, isLiked),

    onMutate: async ({ lpid, isLiked }) => {
      await queryClient.cancelQueries({ queryKey: [QUERY_KEY.lps, lpid] });

      const previousLp = queryClient.getQueryData<ResponseLpDetailDto>([
        QUERY_KEY.lps,
        lpid,
      ]);

      if (previousLp) {
        const currentLikes = previousLp.data.likes || [];
        let newLikes;

        if (isLiked) {
          newLikes = currentLikes.filter(
            (like) => like.userId !== previousLp.data.author.id
          );
        } else {
          newLikes = [
            ...currentLikes,
            { id: -1, userId: previousLp.data.author.id, lpId: Number(lpid) },
          ];
        }

        queryClient.setQueryData<ResponseLpDetailDto>([QUERY_KEY.lps, lpid], {
          ...previousLp,
          data: {
            ...previousLp.data,
            likes: newLikes,
          },
        });
      }

      return { previousLp, lpid };
    },

    onError: (error, _, context) => {
      if (context?.previousLp) {
        queryClient.setQueryData(
          [QUERY_KEY.lps, context.lpid],
          context.previousLp
        );
      }
      console.error("좋아요 실패:", error);
    },

    onSettled: (_, __, variables) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.lps, variables.lpid],
      });
    },
  });
};

export default useToggleLike;
