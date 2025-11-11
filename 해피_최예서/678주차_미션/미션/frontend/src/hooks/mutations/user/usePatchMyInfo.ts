import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../../App.tsx";
import { QUERY_KEY } from "../../../constants/key.ts";
import { patchMyInfo } from "../../../apis/auth.ts";
import type { requestMyInfoEditDto, responseMyInfoDto } from "../../../types/auth.ts";

export default function usePatchMyInfo() {
  return useMutation({
    mutationFn: (body: requestMyInfoEditDto) => patchMyInfo(body),

    onMutate: async (newData) => {
      await queryClient.cancelQueries({ queryKey: [QUERY_KEY.myInfo] });

      const previousData = queryClient.getQueryData<responseMyInfoDto>([QUERY_KEY.myInfo]);

      queryClient.setQueryData<responseMyInfoDto>([QUERY_KEY.myInfo], (old) => {
        if (!old) return old;
        return {
          ...old,
          data: {
            ...old.data,
            ...newData, // 새로 수정된 데이터 즉시 반영
          },
        };
      });

      return { previousData };
    },

    onSuccess: () => {
      alert("프로필 정보가 성공적으로 수정되었습니다.");
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.myInfo] });
    },

    onError: (error, _newData, context) => {
      console.error("내 정보 수정 실패:", error);
      alert("프로필 수정 중 오류가 발생했습니다.");

      if (context?.previousData) {
        queryClient.setQueryData([QUERY_KEY.myInfo], context.previousData);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.myInfo] });
    },
  });
}
