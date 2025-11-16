import type { MeResponse } from "../types/auth";
import { axiosInstance } from "./axiosInstance";

// 로그인 API
export const signIn = async (payload: { email: string; password: string }) => {
  const res = await axiosInstance.post("/v1/auth/signin", payload);
  const data = res.data.data;
  localStorage.setItem("accessToken", data.accessToken);
  localStorage.setItem("refreshToken", data.refreshToken);
  return data;
};
// 회원가입 API
export const signUp = async (payload: {
  email: string;
  password: string;
  name: string;
}) => {
  const res = await axiosInstance.post("/v1/auth/signup", payload);
  return res.data.data;
};

// 내 정보 조회 API
export const getMe = async (): Promise<MeResponse> => {
  const res = await axiosInstance.get<MeResponse>("/v1/users/me");
  return res.data;
};

// 회원 탈퇴 API 리턴 값 없음
export const withdraw = async () => {
  const res = await axiosInstance.delete("/v1/users");
  return res.data;
};

// 로그아웃 API 리턴 값 없음
export const logout = async () => {
  const res = await axiosInstance.post("/v1/auth/signout");
  return res.data;
};

// 사용자 정보 수정 api
export const updateMe = async (data: { name: string; bio: string }) => {
  const res = await axiosInstance.patch("/v1/users", data);
  return res.data;
};
