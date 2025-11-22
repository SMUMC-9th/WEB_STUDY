import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthActions } from "../store/useAuthStore";

const GoogleRedirectPage = () => {
  const nav = useNavigate();
  const { setAccessToken, setRefreshToken } = useAuthActions();

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const accessToken = searchParams.get("accessToken");
    const refreshToken = searchParams.get("refreshToken");

    if (accessToken && refreshToken) {
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
      nav("/");
    }
  }, [nav, setAccessToken, setRefreshToken]);

  return <div></div>;
};

export default GoogleRedirectPage;
