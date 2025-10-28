import axios from "axios";

// axiosInstance 생성
export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// 요청 인터셉터 - accessToken 자동 추가
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터 - accessToken 만료 시 refresh 요청
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (originalRequest.url.includes("/v1/auth/refresh")) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) throw new Error("No refresh token");

        // 순수 axios 사용
        const { data } = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/v1/auth/refresh`,
          { refresh: refreshToken },
          { headers: { "Content-Type": "application/json" } }
        );

        const newAccessToken = data?.result?.accessToken;
        if (!newAccessToken) throw new Error("No new access token");

        localStorage.setItem("accessToken", newAccessToken);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/";
      }
    }

    return Promise.reject(error);
  }
);
