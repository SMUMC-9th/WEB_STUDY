import { LOCAL_STORAGE_KEY } from "../constants/key.ts";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../hooks/useAuth.ts";

export default function RedirectPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const urlParams = new URL(location.href).searchParams;

  const accessToken = urlParams.get("accessToken");
  const refreshToken = urlParams.get("refreshToken");

  useEffect(() => {
    if (accessToken && refreshToken) {

      // accessToken은 Redux에 저장
      login(accessToken);

      // refreshToken은 localStorage 저장
      localStorage.setItem(LOCAL_STORAGE_KEY.refreshToken, refreshToken);

      navigate("/");
    }
  }, [accessToken, refreshToken, login, navigate]);

  return <div>RedirectPage</div>;
}
