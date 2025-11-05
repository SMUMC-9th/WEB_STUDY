import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../../App.tsx";
import { QUERY_KEY } from "../../../constants/key.ts";
import { patchMyInfo } from "../../../apis/auth.ts";
import type { requestMyInfoEditDto } from "../../../types/auth.ts";

export default function usePatchMyInfo() {
  return useMutation({
    mutationFn: (body: requestMyInfoEditDto) => patchMyInfo(body),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.myInfo],
      });
      alert("프로필 정보가 성공적으로 수정되었습니다.");
    },

    onError: (error) => {
      console.error("내 정보 수정 실패:", error);
      alert("프로필 수정 중 오류가 발생했습니다.");
    },
  });
}
