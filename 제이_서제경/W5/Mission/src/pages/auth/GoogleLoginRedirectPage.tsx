import { useEffect, useRef } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { LOCAL_STORAGE_KEY } from "../../constants/key";

const GoogleLoginRedirectPage = () => {
  const { setItem: setAccessToken } = useLocalStorage(
    LOCAL_STORAGE_KEY.accessToken
  );
  const { setItem: setRefreshToken } = useLocalStorage(
    LOCAL_STORAGE_KEY.refreshToken
  );

  // useEffect가 두 번 실행되는 문제 방지
  const didRunRef = useRef(false);

  useEffect(() => {
    if (didRunRef.current) return;
    didRunRef.current = true;

    const urlParams = new URLSearchParams(window.location.search);

    // AccessToken과 RefreshToken을 가져와서 localStorage에 저장
    const accessToken = urlParams.get(LOCAL_STORAGE_KEY.accessToken);
    const refreshToken = urlParams.get(LOCAL_STORAGE_KEY.refreshToken);

    // 백엔드에서 함께 내려주는 원래 이동 경로 (?redirect=/mypage 같은 형태)
    const redirectParam = urlParams.get("redirect");
    const fallback = "/mypage";
    const next =
      redirectParam && redirectParam.startsWith("/") ? redirectParam : fallback;

    if (accessToken && refreshToken) {
      // 1) 토큰 저장
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);

      // 2) URL 정리(쿼리 제거) - 토큰 노출 방지
      const cleanUrl = window.location.origin + window.location.pathname;
      window.history.replaceState({}, "", cleanUrl);

      // 3) 이동
      window.location.replace(next);
      return;
    }

    // 4) 토큰이 없으면 로그인 페이지로 이동
    window.location.replace("/login");
  }, [setAccessToken, setRefreshToken]);

  return <div>구글 로그인 리다이렉 화면</div>;
};

export default GoogleLoginRedirectPage;
