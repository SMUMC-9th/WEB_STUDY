import type { responseSignupDto } from "../types/auth.ts";
import type { requestSignupDto } from "../types/auth.ts";

import type { requestSigninDto } from "../types/auth.ts";
import type { responseSigninDto } from "../types/auth.ts";

import type { responseMyInfoDto } from "../types/auth.ts";

import { axiosInstance } from "./axios.ts";

// 회원가입
export const postSignup = async (
  body: requestSignupDto, // 함수의 매개변수인 body의 타입은 requestSignupDto,
): Promise<responseSignupDto> => {
  // 함수가 반환타는 타입은 responseSIgnupDto 데이터를 담은 Promise

  // 응답 객체에서 실제 data 부분만 구조 분해 할당 (axios는 보통 { data, status, header, ... } 형태로 반환함)
  const { data } = await axiosInstance.post(
    // 첫 번째 인자: 요청 보낼 서버 url, 두 번째 인자: 서버로 보낼 데이터 (body)
    "/v1/auth/signup",
    body,
  );
  return data;
};

// 로그인
export const postSignin = async (
  body: requestSigninDto,
): Promise<responseSigninDto> => {
  const { data } = await axiosInstance.post("/v1/auth/signin", body);
  return data;
};

// 회원가입, 로그인 -> 나중에 호출하는 쪽에서 이렇게 쓸 수 있음
// const signupData = await postSignup({ name: "해피", email: "a@a.com", password: "1234" })
// const signinData = await postSignin({ email: "a@a.com", password: "1234" })

// 마이페이지
export const getMyInfo = async (): Promise<responseMyInfoDto> => {
  const { data } = await axiosInstance.get("/v1/users/me", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });
  return data;
};
