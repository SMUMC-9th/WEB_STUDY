import { useMutation } from "@tanstack/react-query";
import { postLike } from "../../api/lp";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";
import { Likes, ResponseLpDetailDto } from "../../types/lp";
import { ResponseMyInfoDto } from "../../types/auth";

function usePostLike() {
    return useMutation({
        mutationFn: postLike,
        onMutate: async(lp) => {
            // 1. 이 게시글에 관련된 쿼리를 취소(캐시된 데이터를 새로 불러오는 요청)
            await queryClient.cancelQueries({
                queryKey: [QUERY_KEY.lps, lp.lpId],
            });

            // 2. 현재 게시글의 데이터를 캐시에서 가져오기
            const perviousLpPost = queryClient.getQueryData<ResponseLpDetailDto>([
                QUERY_KEY.lps,
                lp.lpId,
            ]);

            // 게시글 데이터를 복사해서 newLpPost라는 객체 생성
            // 복사하는 이뉴는 나중에 오류가 발생했을 때 이전 상태로 되돌리기 위함
            const newLpPost = {...perviousLpPost};

            // 게시글에 저장된 좋아요 목록에서 현재 내가 눌렀던 좋아요의 위치 찾기
            const me = queryClient.getQueryData<ResponseMyInfoDto>([
                QUERY_KEY.myInfo,
            ]);
            const userId = Number(me?.data.id);

            const likedIndex = perviousLpPost?.data.likes.findIndex(
                (like) => like.userId === userId,
            )?? -1;

            if (likedIndex >= 0) {
                perviousLpPost?.data.likes.splice(likedIndex,1);
            } else {
                const newLike = {userId, lpId:lp.lpId} as Likes;
                perviousLpPost?.data.likes.push(newLike);
            }

            // 업데이트 도니 게시글 데이터를 캐시에 저장
            // 이렇게하면 UI가 바로 업데이트 됨, 사용자가 변화를 확인할 수 있음
            queryClient.setQueryData([QUERY_KEY.lps, lp.lpId], newLpPost);

            return {perviousLpPost, newLpPost};
        },

        onError:(err, newLp, context) => {
            console.log(err, newLp);
            queryClient.setQueryData(
                [QUERY_KEY.lps, newLp.lpId],
                context?.perviousLpPost?.data.id,
            );
        },

        // onSettled는 API 요청이 끝난 후 (성공하든 실패하든 실행)
        onSettled: async(data, error, variables) => {
            await queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.lps, variables.lpId],
            });
        }
    });
}

export default usePostLike;
