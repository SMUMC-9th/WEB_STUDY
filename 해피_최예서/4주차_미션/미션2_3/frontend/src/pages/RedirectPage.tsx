import { LOCAL_STORAGE_KEY } from "../constants/key.ts";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useLogin } from "../context/context.tsx";

export default function RedirectPage() {
  const { setIsLogin } = useLogin();
  const navigation = useNavigate();
  // location.search: URL의 파라미터 얻어오기
  // new URLSearchParams 함수를 사용하면 location.search 안에 존재하는 [key, value] 형식으로 묶여있는 파라미터를 얻을 수 있다.

  // searchParams에서 accessToken, refreshToken 받아오기

  // location.href: 현재 페이지 전체 URL 가져올 수 있음.
  const urlParams = new URL(location.href).searchParams;

  const accessToken = urlParams.get("accessToken");
  const refreshToken = urlParams.get("refreshToken");

  useEffect(() => {
    if (accessToken && refreshToken) {
      localStorage.setItem(LOCAL_STORAGE_KEY.accessToken, accessToken);
      localStorage.setItem(LOCAL_STORAGE_KEY.refreshToken, refreshToken);
      setIsLogin(true);
      navigation("/");
    } else {
      setIsLogin(false);
    }
  }, [accessToken, refreshToken]);
  // 두개 다 존재하면, 로컬스토리지에 저장한다
  // { accessToken && refreshToken ? (//로컬스토리지에 저장)}
  //   : (//저장x)

  return <div>RedirectPage</div>;
}
