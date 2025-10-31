import type { CommonResponse } from "./common.ts";

// 회원가입

export type requestSignupDto = {
  name: string;
  email: string;
  bio?: string;
  avatar?: string; // bio, avatar: 필수 아니기 때문에 ?
  password: string;
};

export type responseSignupDto = CommonResponse<{
  id: number;
  name: string;
  email: string;
  bio: string | null;
  avatar: string | null;
  createdAt: Date;
  updatedAt: Date;
}>;

// 로그인
export type requestSigninDto = {
  email: string;
  password: string;
};

export type responseSigninDto = CommonResponse<{
  id: number;
  name: string;
  accessToken: string;
  refreshToken: string;
}>;

// 내 정보 조회
export type responseMyInfoDto = CommonResponse<{
  id: number;
  name: string;
  email: string;
  bio: string | null;
  avatar: string | null;
  createdAt: Date;
  updatedAt: Date;
}>;
