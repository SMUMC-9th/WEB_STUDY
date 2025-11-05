import {useMutation} from "@tanstack/react-query";
import {deleteUser} from "../../../apis/auth.ts";
import {queryClient} from "../../../App.tsx";
import {QUERY_KEY} from "../../../constants/key.ts";


export default function useDeleteUser() {
  return useMutation({
    mutationFn: deleteUser,
    onSuccess:() => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.lps],
      });
      alert("탈퇴되었습니다.");
    },

    onError: (error) => {
      console.log("탈퇴 실패 : ", error);
      alert("탈퇴 중 오류가 발생했습니다.");
    }
  })
}