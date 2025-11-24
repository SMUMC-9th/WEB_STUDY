import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { deleteUser } from "../../apis/user";
import { useAuthActions } from "../../store/useAuthStore";

const useDeleteUser = () => {
  const nav = useNavigate();
  const { clearTokens } = useAuthActions();

  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      clearTokens();
      alert("회원 탈퇴가 완료되었습니다.");
      nav("/", { replace: true });
    },
    onError: (error) => {
      console.error("회원 탈퇴 실패: ", error);
      alert("회원 탈퇴에 실패하였습니다. 다시 시도해주세요");
    },
  });
};

export default useDeleteUser;
