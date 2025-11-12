import type {
  SignInPayload,
  SignInResponse,
  SignUpPayload,
  SignUpResponse,
} from "../types/auth";
import { axiosInstance } from "./axiosInstance";

export const signUp = async (
  payload: SignUpPayload
): Promise<SignUpResponse> => {
  const res = await axiosInstance.post("/v1/auth/signup", payload);
  return res.data;
};

export const signIn = async (
  payload: SignInPayload
): Promise<SignInResponse> => {
  const res = await axiosInstance.post("/v1/auth/signin", payload);
  return res.data;
};
