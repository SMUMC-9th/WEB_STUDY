import type { CommonResponse } from "./common";

// 회원가입
export type RequestSignupDto = {
    name: string;
    email: string;
    bio?: string;
    avatar?: string;
    password: string;
}

export type ResponseSignupDto = CommonResponse<{
    name: string;
    email: string;
    bio: string | null;
    avatar: string | null;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}>;

// 로그인
export type RequestSigninDto = {
    email: string;
    password: string;
};
  
export type ResponseSigninDto = CommonResponse<{
    id: number;
    name: string;
    accessToken: string;
    refreshToken: string;
}>;
  
// 내 정보 조회
export type ResponseMyInfoDto = CommonResponse<{
    id: number;
    name: string;
    email: string;
    bio: string | null;
    avatar: string | null;
    createdAt: Date;
    updatedAt: Date;
}>;

// 사용자 정보 수정
export type RequestUpdateUserDto = {
    name?: string;
    bio?: string;
    avatar?: string;
};
  
export type ResponseUpdateUserDto = CommonResponse<{
    id: number;
    name: string;
    email: string;
    bio: string | null;
    avatar: string | null;
    createdAt: Date;
    updatedAt: Date;
}>;
