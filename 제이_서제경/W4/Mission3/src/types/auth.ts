import type { CommonResponse } from "./common";

// 회원가입 요청 및 응답 타입
export type RequestSignupDto = {
  name: string;
  email: string;
  bio?: string; //필수 아니니까 ?처리
  avatar?: string;
  password: string;
};

export type ResponseSignupDto = CommonResponse<{
  id: number;
  name: string;
  email: string;
  bio: string | null;
  avatar: string | null;
  createdAt: Date;
  updatedAt: Date;
}>;

// 로그인 요청 및 응답 타입
export type RequestLoginDto = {
  email: string;
  password: string;
};

export type ResponseLoginDto = CommonResponse<{
  id: number;
  name: string;
  accessToken: string;
  refreshToken: string;
}>;

// 내 정보 조회 - request body 없으니까 응답 타입만 작성
export type ResponseGetMeDto = CommonResponse<{
  id: number;
  name: string;
  email: string;
  bio: string | null;
  avatar: string | null;
  createdAt: Date;
  updatedAt: Date;
}>;
