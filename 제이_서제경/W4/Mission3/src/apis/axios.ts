import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API_URL,
  withCredentials: true,
});

// axiosInstance를 쓰면 api 호출 시 baseURL이 자동으로 붙어서 요청된다.
// 또한 withCredentials: true 옵션이 설정되어 있어, 쿠키가 필요한 인증 요청에 유용함.
