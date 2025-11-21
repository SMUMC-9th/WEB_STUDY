import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useMutation } from "@tanstack/react-query";
import { deleteUser } from "../../apis/user";
import { LOCAL_STORAGE_KEY } from "../../constants/key";

const useDeleteUser = () => {
  const nav = useNavigate();

  const { setAccessToken, setRefreshToken } = useAuth();

  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      localStorage.removeItem(LOCAL_STORAGE_KEY.accessToken);
      localStorage.removeItem(LOCAL_STORAGE_KEY.refreshToken);

      setAccessToken(null);
      setRefreshToken(null);

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
