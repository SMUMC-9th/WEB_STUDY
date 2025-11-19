import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../../App.tsx";
import { QUERY_KEY } from "../../../constants/key.ts";
import { patchLp } from "../../../apis/lp.ts";
import type {
  RequestUpdateLpDto,
  ResponseUpdateLpDto,
} from "../../../types/lp.ts";

interface PatchLpVariables {
  lpId: number;
  body: RequestUpdateLpDto;
}

export default function usePatchLp() {
  return useMutation<ResponseUpdateLpDto, Error, PatchLpVariables>({
    mutationFn: ({ lpId, body }) => patchLp(lpId, body),

    onSuccess: (_data, variables) => {
      alert("LP가 성공적으로 수정되었습니다.");

      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.lps] });

      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.lps, variables.lpId],
      });
    },

    onError: (error) => {
      console.error("LP 수정 실패:", error);
      alert("LP 수정 중 오류가 발생했습니다.");
    },
  });
}