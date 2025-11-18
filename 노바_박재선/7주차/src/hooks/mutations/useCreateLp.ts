import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createLp } from "../../apis/lp";
import { QUERY_KEY } from "../../constants/key";
import type { LP } from "../../types/lp";

const useCreateLp = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (lpData: LP) => createLp(lpData),
    onSuccess: () => {
      //이거는 홈페이지에 모든 Lp목록
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.lps] });
      //이거는 마이페이지의 내가쓴 Lp목록
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.myLps] });
      alert("LP가 성공적으로 등록되었습니다.");
    },
    onError: (error) => {
      console.error("LP 생성 실패:", error);
      alert("LP 등록에 실패했습니다.");
    },
  });
};

export default useCreateLp;
