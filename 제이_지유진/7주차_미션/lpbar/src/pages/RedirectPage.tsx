import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";

export default function RedirectPage() {
  const { setIsLogged, login } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("accessToken");
    const refreshToken = params.get("refreshToken");
    const id = params.get("id");
    const name = params.get("name");

    if (token) {
      localStorage.setItem("accessToken", token);
      localStorage.setItem("refreshToken", refreshToken || "");
      localStorage.setItem("user", JSON.stringify({ id: Number(id), name }));
      login({ id: Number(id), name: name || "" });
      setIsLogged(true);
      navigate("/my");
    }
  }, [location.search, navigate, setIsLogged, login]);

  return <div>로그인 처리 중...</div>;
}
