import { postLp } from "../../../apis/lp.ts";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../../App.tsx";
import { QUERY_KEY } from "../../../constants/key.ts";
// ?
export default function usePostLp() {
  return useMutation({
    mutationFn: postLp,
    onSuccess: (data) => {
      // 성공 시, 캐시된 Lp 목록 무효화하고 새로 fetch
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.lps],
      });
      console.log("LP 생성 성공", data);
    },
    onError: (error) => {
      console.log("LP 생성 실패", error);
    },
  });
}
