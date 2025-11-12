import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createLpComment } from "../../apis/lp";
import { type CreateCommentRequest } from "../../types/lp";
import { QUERY_KEY } from "../../constants/key";
import type { CommentListDto, CLP } from "../../types/lp";

export default function usePostComment(lpId: number, order: "desc" | "asc") {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: CreateCommentRequest) => createLpComment({ lpId, body }),

    // 낙관적 업데이트
    onMutate: async (body) => {
      await queryClient.cancelQueries({
        queryKey: [QUERY_KEY.lpComments, lpId, order],
      });
      const previous = queryClient.getQueryData<{
        pages: CommentListDto[];
        pageParams: unknown[];
      }>([QUERY_KEY.lpComments, lpId, order]);

      const temp: CLP = {
        id: Number.MIN_SAFE_INTEGER,
        content: body.content,
        createdAt: new Date().toISOString(),
        author: {
          id: -1,
          name: "나",
          avatar: "https://placehold.co/40x40?text=Me",
        },
      } as unknown as CLP;

      if (previous?.pages?.length) {
        const copy = structuredClone(previous);
        const firstPage = copy.pages[0];
        if (order === "desc") {
          firstPage.data.data.unshift(temp);
        } else {
          firstPage.data.data.push(temp);
        }
        queryClient.setQueryData([QUERY_KEY.lpComments, lpId, order], copy);
      }

      return { previous };
    },

    onError: (_e, _body, ctx) => {
      if (ctx?.previous) {
        queryClient.setQueryData(
          [QUERY_KEY.lpComments, lpId, order],
          ctx.previous
        );
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.lpComments, lpId, order],
      });
    },
  });
}
