import type {
  RequestLoginDto,
  RequestSignupDto,
  ResponseGetMeDto,
  ResponseLoginDto,
  ResponseSignupDto,
} from "../types/auth";
import { axiosInstance } from "./axios";

// 회원가입 API 호출 함수
export const postSignup = async (
  body: RequestSignupDto
): Promise<ResponseSignupDto> => {
  const { data } = await axiosInstance.post("v1/auth/signup", body); //axiosInstance로 요청 보내기
  return data;
};

// 로그인 API 호출 함수
export const postLogin = async (
  body: RequestLoginDto
): Promise<ResponseLoginDto> => {
  const { data } = await axiosInstance.post("v1/auth/signin", body);
  return data;
};

// 내 정보 조회 API 호출 함수
export const getMyInfo = async (): Promise<ResponseGetMeDto> => {
  const { data } = await axiosInstance.get("v1/users/me", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`, //로컬 스토리지에서 토큰 가져오기
    },
  });
  return data;
};
