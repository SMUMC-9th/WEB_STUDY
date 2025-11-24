import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { QUERY_KEY } from "../../constants/key";
import { deleteLp } from "../../apis/lp";

const useDeleteLp = () => {
  const queryClient = useQueryClient();
  const nav = useNavigate();

  return useMutation<void, Error, string>({
    mutationFn: (lpid: string) => deleteLp(lpid),

    onSuccess: (data, lpid) => {
      alert("LP삭제되었습니다.");

      queryClient.removeQueries({
        queryKey: [QUERY_KEY.lps, lpid],
      });

      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.lps] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.myLps] });

      nav(-1, { replace: true });
    },

    onError: (error) => {
      console.error("LP삭제 실패: ", error);
      alert("LP삭제 실패하였습니다");
    },
  });
};

export default useDeleteLp;
