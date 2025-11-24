import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { postLogout } from "../../apis/auth";
import { useAuthActions } from "../../store/useAuthStore";

const useLogout = () => {
  const nav = useNavigate();
  const { clearTokens } = useAuthActions();

  return useMutation({
    mutationFn: postLogout,
    onSuccess: () => {
      clearTokens();
      alert("로그아웃이 완료되었습니다.");
      nav("/", { replace: true });
    },
    onError: (error) => {
      console.error("로그아웃 실패: ", error);
      alert("로그아웃에 실패하였습니다. 다시시도해주세요");
    },
  });
};

export default useLogout;
