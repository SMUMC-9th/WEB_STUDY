import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../../App.tsx";
import { QUERY_KEY } from "../../../constants/key.ts";
import { useNavigate } from "react-router-dom";
import { deleteLp } from "../../../apis/lp.ts";
import type { ResponseDeleteLpDto } from "../../../types/lp.ts";

export default function useDeleteLp() {
  const navigate = useNavigate();

  return useMutation<ResponseDeleteLpDto, Error, number>({
    mutationFn: (lpId) => deleteLp(lpId),

    onSuccess: () => {
      alert("LP가 성공적으로 삭제되었습니다.");

      // 목록 새로고침
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.lps] });

      // 삭제 후 목록 페이지로 이동
      navigate("/lps");
    },

    onError: (error) => {
      console.error("LP 삭제 실패:", error);
      alert("LP 삭제 중 오류가 발생했습니다.");
    },
  });
}