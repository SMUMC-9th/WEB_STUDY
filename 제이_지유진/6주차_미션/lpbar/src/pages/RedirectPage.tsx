import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";

export default function RedirectPage() {
  const { setIsLogged } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("accessToken");

    if (token) {
      localStorage.setItem("accessToken", token);
      localStorage.setItem("refreshToken", token);
      setIsLogged(true);
      navigate("/my");
    }
  }, [location.search, navigate, setIsLogged]);

  return <div>로그인 처리 중...</div>;
}
