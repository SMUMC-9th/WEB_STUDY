// 역할: 매번 axios.get()할 때마다 baseURL, Authorization 같은 옵션을 적기 귀찮으니까 한 번에 만들어 둠.

import axios from "axios";

export const axiosClient = axios.create({
  baseURL: "https://api.themoviedb.org/3", // 모든 요청은 이 주소 기준으로 날아감.
  // 그래서 axiosClient.get("/movie/popular") 하면
  // 결국 "https://api.themoviedb.org/3/movie/popular" 로 요청 나감.
  headers: {
    // Authorization 헤더 자동 포함됨
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
  },
});
