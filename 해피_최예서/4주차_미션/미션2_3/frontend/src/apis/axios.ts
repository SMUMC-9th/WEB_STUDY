import axios from "axios";
import { LOCAL_STORAGE_KEY } from "../constants/key.ts";

// interceptor: axios에서 요청이나 응답을 가로채는 함수 (요청이 가기 전에 뭔가 추가 or 응답 오기 전에 가공 가능)

// axios = axios에서 요청 보낼 때 쓰는 설정 객체
// 예시:
// {
//   url: "/mypage",
//     method: "get",
//   headers: { "Content-Type": "application/json" },
//   data: undefined
// }
// 이런 게 config 파라미터로 들어옴

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API_URL,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem(LOCAL_STORAGE_KEY.accessToken);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; //HTTP 요청할 때 인증 정보를 실음
  }
  return config; // 수정된 config를 다시 돌려줘야 요청이 정상 진행됨
});
