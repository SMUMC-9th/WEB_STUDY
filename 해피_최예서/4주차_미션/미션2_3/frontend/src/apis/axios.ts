import axios from "axios";
import { LOCAL_STORAGE_KEY } from "../constants/key.ts";

export const axiosInstance = axios.create({
  // axios.create({...}) : axios 인스턴스를 새로 만드는 함수. 반복적으로 쓰는 설정(ex: baseURL, 헤더, timeout 등)을 미리 지정 가능
  baseURL: import.meta.env.VITE_SERVER_API_URL,
  headers: {
    Authorization: `Bearer ${localStorage.getItem(LOCAL_STORAGE_KEY.accessToken)}`, // 로컬 스토리지에 넣어 둔 토큰을 넣음
  },
});
