// hooks/mutations/usePostLike.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postLike } from "../../apis/lp";
import { QUERY_KEY } from "../../constants/key";
import type { Likes, ResponseLpDto } from "../../types/lp";

// 서버에 보낼 변수 타입 (postLike의 인자와 동일하게)
type LikeVars = { lpId: number };

export default function usePostLike() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (vars: LikeVars) => postLike(vars),

    // API 호출 직전: 캐시를 낙관적으로 반영하고 이전 상태를 context로 반환
    onMutate: async (vars) => {
      const { lpId } = vars;

      // 1) 이 글에 대한 네트워크 요청 중단
      await queryClient.cancelQueries({ queryKey: [QUERY_KEY.lps, lpId] });

      // 2) 이전 상세 데이터 스냅샷 (롤백에 사용)
      const prev = queryClient.getQueryData<ResponseLpDto>([
        QUERY_KEY.lps,
        lpId,
      ]);

      // 3) 내 유저 ID (마이페이지/내정보 캐시 사용)
      const me = queryClient.getQueryData<{ data?: { id?: number } }>([
        QUERY_KEY.myInfo,
      ]);
      const userId = me?.data?.id;
      if (!prev || !userId) {
        // 필요한 데이터가 없으면 낙관적 업데이트 생략
        return { prev };
      }

      // 4) 낙관적 next 상태 생성(불변 업데이트)
      const isLiked = prev.data.likes.some((l) => l.userId === userId);
      const nextLikes: Likes[] = isLiked
        ? prev.data.likes.filter((l) => l.userId !== userId)
        : [
            ...prev.data.likes,
            // id는 서버가 부여하므로 임시 음수 ID 사용(렌더용)
            { id: -1, userId, lpId } as Likes,
          ];

      const next: ResponseLpDto = {
        ...prev,
        data: {
          ...prev.data,
          likes: nextLikes,
        },
      };

      // 5) 캐시에 즉시 반영 → UI 즉시 업데이트
      queryClient.setQueryData([QUERY_KEY.lps, lpId], next);

      // 6) 롤백용 context 반환
      return { prev };
    },

    // 실패 시: 이전 상태로 롤백
    onError: (_err, vars, context) => {
      if (context?.prev) {
        queryClient.setQueryData([QUERY_KEY.lps, vars.lpId], context.prev);
      }
    },

    // ✅ 성공/실패 무관: 서버 정답으로 동기화
    onSettled: (_data, _error, vars) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.lps, vars.lpId] });
      // 필요하다면 리스트도 함께 갱신
      // queryClient.invalidateQueries({ queryKey: [QUERY_KEY.lps] });
    },
  });
}
