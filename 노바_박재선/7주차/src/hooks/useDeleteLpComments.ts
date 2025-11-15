import {
  type InfiniteData,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { PAGINATION_ORDER } from "../enums/common";
import { deleteLpComment } from "../apis/comment";
import { QUERY_KEY } from "../constants/key";
import type { Comment, ResponseCommentListDto } from "../types/common";

interface DeleteLpCommentVariables {
  lpid: string;
  commentId: number;
  order: PAGINATION_ORDER;
}

const useDeleteComments = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ lpid, commentId }: DeleteLpCommentVariables) =>
      deleteLpComment(lpid, commentId),

    onMutate: async ({ lpid, commentId, order }) => {
      const queryKey = [QUERY_KEY.lpComments, lpid, order];

      await queryClient.cancelQueries({ queryKey });

      const previousComments =
        queryClient.getQueryData<InfiniteData<ResponseCommentListDto>>(
          queryKey
        );

      if (previousComments) {
        //filter로 해당되는 댓글 제거하기
        const updatedPages = previousComments.pages.map((page) => ({
          ...page,
          data: {
            ...page.data,
            data: page.data.data.filter(
              (comment: Comment) => comment.id !== commentId
            ),
          },
        }));
        queryClient.setQueryData<InfiniteData<ResponseCommentListDto>>(
          queryKey,
          {
            ...previousComments,
            pages: updatedPages,
          }
        );
      }
      return { previousComments, queryKey };
    },

    onError: (error, variables, context) => {
      if (context?.previousComments) {
        queryClient.setQueryData(context.queryKey, context.previousComments);
      }
      console.error("댓글 삭제 실패:", error);
      alert("댓글 삭제에 실패했습니다.");
    },

    onSettled: (data, error, variables) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.lpComments, variables.lpid],
      });
    },
  });
};

export default useDeleteComments;
