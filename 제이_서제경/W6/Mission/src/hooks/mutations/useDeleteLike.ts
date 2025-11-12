// hooks/mutations/useDeleteLike.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteLike } from "../../apis/lp";
import { QUERY_KEY } from "../../constants/key";
import type { Likes, ResponseLpDto } from "../../types/lp";

// 서버에 보낼 변수 타입 (deleteLike의 인자와 동일)
type DislikeVars = { lpId: number };

export default function useDeleteLike() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (vars: DislikeVars) => deleteLike(vars),

    // 호출 직전: 캐시를 낙관적으로 반영하고 이전 스냅샷을 context로 반환
    onMutate: async (vars) => {
      const { lpId } = vars;

      // 1) 이 글 관련 네트워크 요청 중단
      await queryClient.cancelQueries({ queryKey: [QUERY_KEY.lps, lpId] });

      // 2) 이전 상세 데이터 스냅샷
      const prev = queryClient.getQueryData<ResponseLpDto>([
        QUERY_KEY.lps,
        lpId,
      ]);

      // 3) 내 유저 ID (내정보 캐시에서)
      const me = queryClient.getQueryData<{ data?: { id?: number } }>([
        QUERY_KEY.myInfo,
      ]);
      const userId = me?.data?.id;
      if (!prev || !userId) return { prev }; // 안전 가드

      // 4) 낙관적 next 상태 (내 like 제거)
      const nextLikes: Likes[] = prev.data.likes.filter(
        (l) => l.userId !== userId
      );

      const next: ResponseLpDto = {
        ...prev,
        data: { ...prev.data, likes: nextLikes },
      };

      // 5) 캐시에 즉시 반영 → UI 즉시 업데이트
      queryClient.setQueryData([QUERY_KEY.lps, lpId], next);

      // 6) 롤백용 context 반환
      return { prev };
    },

    // 실패 시: 이전 상태로 롤백
    onError: (_error, vars, context) => {
      if (context?.prev) {
        queryClient.setQueryData([QUERY_KEY.lps, vars.lpId], context.prev);
      }
    },

    // 성공/실패 무관: 서버 정답으로 동기화
    onSettled: (_data, _error, vars) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.lps, vars.lpId] });
      // 필요하면 리스트도 함께 갱신:
      // queryClient.invalidateQueries({ queryKey: [QUERY_KEY.lps] });
    },
  });
}
