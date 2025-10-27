import { PropsWithChildren, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RequestSigninDto } from "../types/auth";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import { postLogout, postSignin } from "../api/auth";
import { AuthContext } from "../context/AuthContext";

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const navigate = useNavigate();

  const {
    getItem: getAccessTokenFromStorage,
    setItem: setAccessTokenInStorage,
    removeItem: removeAccessTokenFromStorage,
  } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);

  const {
    getItem: getRefreshTokenFromStorage,
    setItem: setRefreshTokenInStorage,
    removeItem: removeRefreshTokenFromStorage,
  } = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);

  const [accessToken, setAccessToken]: [string | null, React.Dispatch<React.SetStateAction<string | null>>] =
    useState<string | null>(getAccessTokenFromStorage());

  const [refreshToken, setRefreshToken]: [string | null, React.Dispatch<React.SetStateAction<string | null>>] =
    useState<string | null>(getRefreshTokenFromStorage());

  const login = async (signinData: RequestSigninDto) => {
    try {
      const { data } = await postSignin(signinData);

      if (data) {
        const newAccessToken: string = data.accessToken;
        const newRefreshToken: string = data.refreshToken;

        setAccessTokenInStorage(newAccessToken);
        setRefreshTokenInStorage(newRefreshToken);

        setAccessToken(newAccessToken);
        setRefreshToken(newRefreshToken);

        alert("로그인 성공");
        navigate("/my"); // window.location.href 대신 navigate 사용
      }
    } catch (error) {
      console.error("로그인 오류", error);
      alert("로그인 실패");
    }
  };

  const logout = async () => {
    try {
      await postLogout();
      removeAccessTokenFromStorage();
      removeRefreshTokenFromStorage();

      setAccessToken(null);
      setRefreshToken(null);

      alert("로그아웃 성공");
      navigate("/"); // 홈으로 리다이렉트
    } catch (error) {
      console.error("로그아웃 오류", error);
      alert("로그아웃 실패");
    }
  };

  return (
    <AuthContext.Provider value={{ accessToken, refreshToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};