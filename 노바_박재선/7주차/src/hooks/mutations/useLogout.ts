import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useMutation } from "@tanstack/react-query";
import { postLogout } from "../../apis/auth";
import { LOCAL_STORAGE_KEY } from "../../constants/key";

const useLogout = () => {
  const nav = useNavigate();

  const { setAccessToken, setRefreshToken } = useAuth();

  return useMutation({
    mutationFn: postLogout,
    onSuccess: () => {
      localStorage.removeItem(LOCAL_STORAGE_KEY.accessToken);
      localStorage.removeItem(LOCAL_STORAGE_KEY.refreshToken);

      setAccessToken(null);
      setRefreshToken(null);

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
