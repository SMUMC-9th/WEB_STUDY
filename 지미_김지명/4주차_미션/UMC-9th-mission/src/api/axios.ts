import axios from "axios";
import { LOCAL_STORAGE_KEY } from "../constants/key";

export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_SERVER_API_URL,
    // 여기서는 헤더를 설정하지 않음
});

// 요청 인터셉터 : 매 요청마다 실행됨
axiosInstance.interceptors.request.use(
	(config) => {
		// 매번 최신 토큰 읽기
		const token = localStorage.getItem(LOCAL_STORAGE_KEY.accessToken);
				
		if (token) {
				config.headers.Authorization = `Bearer ${token}`;
		}
				
		return config;
		},
		(error) => {
			return Promise.reject(error);
		}
);