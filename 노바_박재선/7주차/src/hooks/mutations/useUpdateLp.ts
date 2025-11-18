import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateLp } from "../../apis/lp";
import { QUERY_KEY } from "../../constants/key";
import type { DefaultLp } from "../../types/lp";

interface UpdateLpVariables {
  lpid: string;
  lp: DefaultLp;
}

const useUpdateLp = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ lpid, lp }: UpdateLpVariables) => updateLp(lpid, lp),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.lps, variables.lpid],
      });
      alert("Lp 수정완료");
    },
    onError: (error) => {
      console.error("LP 수정실패: ", error);
      alert("LP 수정에 실패했습니다");
    },
  });
};

export default useUpdateLp;
