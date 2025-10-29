import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; 
import { LOCAL_STORAGE_KEY } from "../constants/key";

const LoginRedirect = () => {
    const navigate = useNavigate();
    const { setAccessToken, setRefreshToken } = useAuth();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);

        const accessToken = params.get('accessToken');
        const refreshToken = params.get('refreshToken');

        if (accessToken && refreshToken) {
            // localStorage에 저장
            localStorage.setItem(LOCAL_STORAGE_KEY.accessToken, accessToken);
            localStorage.setItem(LOCAL_STORAGE_KEY.refreshToken, refreshToken);
            
            // AuthContext 상태 업데이트 ← 이 부분이 핵심!
            setAccessToken(accessToken);
            setRefreshToken(refreshToken);
            
            navigate('/');
        }
    }, [navigate, setAccessToken, setRefreshToken]);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-2xl">로그인 중...</div>
    </div>
  )
}

export default LoginRedirect