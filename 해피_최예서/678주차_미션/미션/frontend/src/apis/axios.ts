import axios, { type InternalAxiosRequestConfig } from "axios";
import { LOCAL_STORAGE_KEY } from "../constants/key.ts";

interface CustomInternalAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean; // 요청 재시도 여부
}

let refreshPromise: Promise<string> | null = null;

// axios 인스턴스 생성
export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API_URL,
});

// 요청 인터셉터
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem(LOCAL_STORAGE_KEY.accessToken);
    if (accessToken) {
      // config.headers가 undefined일 수 있으므로 ?? {} 처리 추가
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

//  응답 인터셉터
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config as CustomInternalAxiosRequestConfig;

    // 401 에러이고 아직 재시도 안했으면 처리
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // 이미 refresh 진행중이면 기존 Promise 재사용
      if (!refreshPromise) {
        refreshPromise = (async () => {
          // 훅 대신 localStorage API 직접 사용
          try {
            const refreshToken = localStorage.getItem(
              LOCAL_STORAGE_KEY.refreshToken,
            );
            if (!refreshToken) throw new Error("No refresh token");

            const { data } = await axios.post(
              `${import.meta.env.VITE_SERVER_API_URL}/v1/auth/refresh`,
              { refresh: refreshToken },
            );

            // 새 토큰 저장
            const newAccessToken = data.data.accessToken;
            const newRefreshToken = data.data.refreshToken;
            localStorage.setItem(LOCAL_STORAGE_KEY.accessToken, newAccessToken);
            localStorage.setItem(
              LOCAL_STORAGE_KEY.refreshToken,
              newRefreshToken,
            );

            return newAccessToken;
          } catch (err) {
            // 리프레시 실패 시 토큰 삭제 및 로그인 페이지로 리다이렉트
            localStorage.removeItem(LOCAL_STORAGE_KEY.accessToken);
            localStorage.removeItem(LOCAL_STORAGE_KEY.refreshToken);
            window.location.href = "/signin";
            throw err;
          } finally {
            refreshPromise = null; // Promise 초기화
          }
        })();
      }

      try {
        const newAccessToken = await refreshPromise;

        // 새 토큰으로 헤더 교체 후 요청 재시도
        // originalRequest.headers가 undefined일 수 있으므로 ?? {} 처리 추가
        originalRequest.headers = originalRequest.headers ?? {};
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (err) {
        return Promise.reject(err);
      }
    }

    // 401 외 에러 그대로 반환
    return Promise.reject(error);
  },
);
