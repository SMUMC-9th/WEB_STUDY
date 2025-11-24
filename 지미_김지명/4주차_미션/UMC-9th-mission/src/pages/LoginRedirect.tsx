import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/useAuthStore";

const LoginRedirect = () => {
  const navigate = useNavigate();
  // Zustand store 사용
  const { setAccessToken, setRefreshToken } = useAuthStore();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const accessToken = params.get("accessToken");
    const refreshToken = params.get("refreshToken");

    if (accessToken && refreshToken) {
      // Zustand store에 저장 (localStorage는 store 내부에서 처리됨)
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);

      navigate("/");
    }
  }, [navigate, setAccessToken, setRefreshToken]);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-2xl">로그인 중...</div>
    </div>
  );
};

export default LoginRedirect;
