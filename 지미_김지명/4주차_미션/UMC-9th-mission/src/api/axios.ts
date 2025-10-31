import axios, { InternalAxiosRequestConfig } from "axios";
import { LOCAL_STORAGE_KEY } from "../constants/key";

/**
 * 재시도 플래그를 포함한 커스텀 Axios 설정 인터페이스
 * _retry: 토큰 갱신 후 요청을 재시도했는지 추적하는 플래그
 */
interface CustomInternalAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

/**
 * 토큰 갱신 프로미스를 저장하는 전역 변수
 * 여러 요청이 동시에 401 에러를 받았을 때, 중복 갱신 요청을 방지하기 위해 사용
 */
let refreshPromise: Promise<string> | null = null;

/**
 * Axios 인스턴스 생성
 * baseURL은 환경 변수에서 가져옴
 */
export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API_URL,
});

// ===== localStorage 토큰 관리 함수들 =====
// Hook을 사용할 수 없는 환경이므로 localStorage를 직접 사용

/**
 * Access Token 관련 함수들
 */
const getAccessToken = () => localStorage.getItem(LOCAL_STORAGE_KEY.accessToken);
const setAccessToken = (token: string) => localStorage.setItem(LOCAL_STORAGE_KEY.accessToken, token);
const removeAccessToken = () => localStorage.removeItem(LOCAL_STORAGE_KEY.accessToken);

/**
 * Refresh Token 관련 함수들
 */
const getRefreshToken = () => localStorage.getItem(LOCAL_STORAGE_KEY.refreshToken);
const setRefreshToken = (token: string) => localStorage.setItem(LOCAL_STORAGE_KEY.refreshToken, token);
const removeRefreshToken = () => localStorage.removeItem(LOCAL_STORAGE_KEY.refreshToken);

/**
 * 요청 인터셉터
 * 모든 요청 전에 실행되어 Authorization 헤더에 토큰을 자동으로 추가
 */
axiosInstance.interceptors.request.use(
  (config) => {
    // localStorage에서 accessToken 가져오기
    const accessToken = getAccessToken();
    
    // 토큰이 있으면 Authorization 헤더에 Bearer 형식으로 추가
    if (accessToken) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    
    return config;
  },
  // 요청 에러 발생 시 Promise reject
  (error) => Promise.reject(error)
);

/**
 * 응답 인터셉터
 * 401 에러 처리 및 토큰 자동 갱신 로직
 */
axiosInstance.interceptors.response.use(
  // 성공 응답은 그대로 반환
  (response) => response,
  
  // 에러 응답 처리
  async (error) => {
    const originalRequest: CustomInternalAxiosRequestConfig = error.config;
    
    // 401 Unauthorized 에러이고, 아직 재시도하지 않은 요청인 경우
    if (error.response?.status === 401 && !originalRequest._retry) {
      
      // Case 1: refresh 엔드포인트 자체에서 401 발생
      // = refresh token도 만료된 상황
      if (originalRequest.url === '/v1/auth/refresh') {
        // 모든 토큰 삭제하고 로그인 페이지로 리다이렉트
        removeAccessToken();
        removeRefreshToken();
        window.location.href = "/login";
        return Promise.reject(error);
      }

      // Case 2: 일반 API 요청에서 401 발생
      // = access token만 만료된 상황
      
      // 재시도 플래그 설정 (무한 루프 방지)
      originalRequest._retry = true;

      // 토큰 갱신 프로미스가 없으면 새로 생성
      if (!refreshPromise) {
        refreshPromise = (async () => {
          try {
            // refresh token으로 새 토큰 요청
            const refreshToken = getRefreshToken();
            const { data } = await axiosInstance.post("/v1/auth/refresh", {
              refresh: refreshToken,
            });

            // 새로 받은 토큰들을 localStorage에 저장
            setAccessToken(data.data.accessToken);
            setRefreshToken(data.data.refreshToken);

            // 새 accessToken 반환 (다른 대기 중인 요청들이 사용할 수 있도록)
            return data.data.accessToken;
          } catch (error) {
            // 토큰 갱신 실패 시 로그아웃 처리
            removeAccessToken();
            removeRefreshToken();
            window.location.href = "/login";
            throw error;
          } finally {
            // 갱신 완료 후 프로미스 초기화
            refreshPromise = null;
          }
        })();
      }

      try {
        // 토큰 갱신 완료 대기
        const newAccessToken = await refreshPromise;
        
        // 원래 요청의 헤더에 새 토큰 설정
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        
        // 원래 요청 재시도
        return axiosInstance.request(originalRequest);
      } catch {
        // 토큰 갱신 실패 시 원래 에러 반환
        return Promise.reject(error);
      }
    }
    
    // 401이 아닌 다른 에러는 그대로 반환
    return Promise.reject(error);
  }
);