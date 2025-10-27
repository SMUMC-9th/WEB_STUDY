import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoginRedirect = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);

        const accessToken = params.get('accessToken');
        const refreshToken = params.get('refreshToken');

        if (accessToken && refreshToken) {
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
            navigate('/');
        }
    }, [navigate]);

  return (
    <div className="flex justify-center items-center">
      <div className="text-2xl">로딩 중...</div>
    </div>
  )
}

export default LoginRedirect
