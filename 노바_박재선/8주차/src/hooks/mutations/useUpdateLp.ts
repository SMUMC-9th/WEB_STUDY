import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateLp } from "../../apis/lp";
import { QUERY_KEY } from "../../constants/key";

interface UpdateLpVariables {
  lpid: string;
  formData: FormData;
}

const useUpdateLp = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ lpid, formData }: UpdateLpVariables) =>
      updateLp(lpid, formData),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.lpComments, variables.lpid],
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
