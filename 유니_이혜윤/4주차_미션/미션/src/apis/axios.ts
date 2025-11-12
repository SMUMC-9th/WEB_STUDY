import axios, { type InternalAxiosRequestConfig } from "axios";
import { LOCAL_STORAGE_KEY } from "../constants/key.ts";
import { useLocalStorage } from "../hooks/useLocalStorage.ts";

interface CustomInternalAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

// 재할당 필요 let
let refreshPromise: Promise<string> | null = null;

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(LOCAL_STORAGE_KEY.accessToken);
    if (token === null) return config;
    const parseToken = JSON.parse(token);
    if (parseToken) {
      config.headers = config.headers || {};
      (
        config.headers as Record<string, string>
      ).Authorization = `Bearer ${parseToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 401 에러 발생하면 refresh 토큰으로 토큰 갱신
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config as CustomInternalAxiosRequestConfig;

    // refresh 401이면 로그아웃
    if (
      error.response?.status === 401 &&
      originalRequest?.url === "/v1/auth/refresh"
    ) {
      const { removeItem: removeAccessToken } = useLocalStorage(
        LOCAL_STORAGE_KEY.accessToken
      );
      const { removeItem: removeRefreshToken } = useLocalStorage(
        LOCAL_STORAGE_KEY.refreshToken
      );
      removeAccessToken();
      removeRefreshToken();
      window.location.href = "/login";
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (!refreshPromise) {
        refreshPromise = (async () => {
          const { getItem: getRefreshToken } = useLocalStorage(
            LOCAL_STORAGE_KEY.refreshToken
          );
          const refreshToken = getRefreshToken();

          const { data } = await axiosInstance.post("/v1/auth/refresh", {
            refresh: refreshToken,
          });

          const { setItem: setAccessToken } = useLocalStorage(
            LOCAL_STORAGE_KEY.accessToken
          );
          const { setItem: setRefreshToken } = useLocalStorage(
            LOCAL_STORAGE_KEY.refreshToken
          );

          setAccessToken(data.data.accessToken);
          setRefreshToken(data.data.refreshToken);

          return data.data.accessToken as string;
        })()
          .catch((e) => {
            const { removeItem: removeAccessToken } = useLocalStorage(
              LOCAL_STORAGE_KEY.accessToken
            );
            const { removeItem: removeRefreshToken } = useLocalStorage(
              LOCAL_STORAGE_KEY.refreshToken
            );
            removeAccessToken();
            removeRefreshToken();
            throw e;
          })
          .finally(() => {
            refreshPromise = null;
          });
      }

      // 갱신 완료 후 원래 요청 재시도
      const newAccessToken = await refreshPromise;
      originalRequest.headers = originalRequest.headers || {};
      (
        originalRequest.headers as Record<string, string>
      ).Authorization = `Bearer ${newAccessToken}`;
      return axiosInstance.request(originalRequest);
    }

    return Promise.reject(error);
  }
);
