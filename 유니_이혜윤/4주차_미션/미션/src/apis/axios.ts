import axios from "axios";
import { LOCAL_STORAGE_KEY } from "../constants/key.ts";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API_URL,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem(LOCAL_STORAGE_KEY.accessToken);
  if (token === null) return config;
  const parseToken = JSON.parse(token);
  if (parseToken) {
    config.headers.Authorization = `Bearer ${parseToken}`;
  }
  return config;
});
