// import type {
//   SignInPayload,
//   SignInResponse,
//   SignUpPayload,
//   SignUpResponse,
//   MeResponse,
// } from "../types/auth";
// import { axiosInstance } from "./axiosInstance";

import type { MeResponse } from "../types/auth";
import { axiosInstance } from "./axiosInstance";

// export const signUp = async (
//   payload: SignUpPayload
// ): Promise<SignUpResponse> => {
//   const res = await axiosInstance.post("/v1/auth/signup", payload);
//   return res.data;
// };

// export const signIn = async (
//   payload: SignInPayload
// ): Promise<SignInResponse> => {
//   const res = await axiosInstance.post("/v1/auth/signin", payload);
//   return res.data;
// };
export const signIn = async (payload: { email: string; password: string }) => {
  const res = await axiosInstance.post("/v1/auth/signin", payload);
  const data = res.data.data;
  localStorage.setItem("accessToken", data.accessToken);
  localStorage.setItem("refreshToken", data.refreshToken);
  return data;
};

export const signUp = async (payload: {
  email: string;
  password: string;
  name: string;
}) => {
  const res = await axiosInstance.post("/v1/auth/signup", payload);
  return res.data.data;
};

export const getMe = async (): Promise<MeResponse> => {
  const res = await axiosInstance.get<MeResponse>("/v1/users/me");
  return res.data;
};
