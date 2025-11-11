import { useMutation } from "@tanstack/react-query";
import { postLike } from "../../../apis/lp.ts";
import { queryClient } from "../../../App.tsx";
import { QUERY_KEY } from "../../../constants/key.ts";
import type { Likes, ResponseLpDto } from "../../../types/lp.ts";
import type { responseMyInfoDto } from "../../../types/auth.ts";

function usePostLike() {
  return useMutation({
    mutationFn: postLike,
    // onMutate -> API 요청 이전에 호출되는 친구
    // UI에 바로 변경을 보여주기 중에 캐시 업데이트
    onMutate: async (lp) => {
      // 1. 이 게시글에 관련된 쿼리를 취소(캐시된 데이터를 새로 불러오는 요청)
      await queryClient.cancelQueries({
        queryKey: [QUERY_KEY.lps, lp.lpId],
      });

      // 2. 현재 게시글의 데이터를 캐시에서 받아오기
      const previousLpPost = queryClient.getQueryData<ResponseLpDto>([
        QUERY_KEY.lps,
        lp.lpId,
      ]);

      // 게시글 데이터를 복사해서 NewLpPost라는 새로운 객체를 만들 거임. (복사 하는 이유 -> 오류 발생 시 되돌리기 위해)
      const newLpPost = { ...previousLpPost };

      // 게시글에 저장된 좋아요 목록에서 현재 내가 눌렀던 좋아요의 위치를 찾기
      const me = queryClient.getQueryData<responseMyInfoDto>([
        QUERY_KEY.myInfo,
      ]);
      const userId = Number(me?.data.id);

      const likedIndex =
        previousLpPost?.data.likes.findIndex(
          (like) => like.userId === userId,
        ) ?? -1;

      if (likedIndex >= 0) {
        previousLpPost?.data.likes.splice(likedIndex, 1);
      } else {
        const newLike = { userId, lpId: lp.lpId } as Likes;
        previousLpPost?.data.likes.push(newLike);
      }

      // 업데이트된 게시글 데이터 캐시에 저장
      // 이렇게하면 UI가 바로 업데이트 됨, 사용자가 바로 변화 확인 가능
      queryClient.setQueryData([QUERY_KEY.lps, lp.lpId], newLpPost);

      return { previousLpPost, newLpPost };
    },

    onError: (err, newLp, context) => {
      console.log(err, newLp);
      queryClient.setQueryData(
        [QUERY_KEY.lps, newLp.lpId],
        context?.previousLpPost?.data.id,
      );
    },

    // onSettled는 API 요청이 끝난 후 (성공하든 실패하든 실행)
    onSettled: async (data, error, variables, context) => {
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.lps, variables.lpId],
      });
    },
  });
}

export default usePostLike;
