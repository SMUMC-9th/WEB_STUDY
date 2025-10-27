import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터 - 매 요청 시 Access Token 자동 추가
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

// 응답 인터셉터 - 토큰 만료 시 자동 재발급 처리
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Access Token 만료 (401 Unauthorized) 시 처리
    if (
      error.response?.status === 401 &&
      !originalRequest._retry // 무한 루프 방지 플래그
    ) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");

        if (!refreshToken) {
          // 리프레시 토큰이 없으면 로그인 페이지로 이동
          window.location.href = "/login";
          return Promise.reject(error);
        }

        // Refresh Token으로 새 Access Token 요청
        const { data } = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/v1/auth/refresh`,
          { refreshToken }
        );

        const newAccessToken = data?.result?.accessToken;

        if (newAccessToken) {
          // 새 토큰 저장
          localStorage.setItem("accessToken", newAccessToken);

          // Authorization 헤더 갱신 후 원래 요청 재시도
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return axiosInstance(originalRequest);
        }
      } catch (refreshError) {
        console.error("토큰 재발급 실패:", refreshError);
        // Refresh Token도 만료된 경우 로그인으로
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);
