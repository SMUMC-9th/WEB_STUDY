import { z } from "zod";

export type UserSigninInformaion = {
  email: string;
  password: string;
};

function validateUser(values: UserSigninInformaion) {
  const errors = { email: "", password: "" };

  // 이메일
  if (
    !/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i.test(
      values.email
    )
  ) {
    errors.email = "이메일 형식이 올바르지 않습니다.";
  }

  // 비밀번호: 앞뒤 공백 제거 후 길이 확인
  const len = values.password.trim().length;
  if (len < 8 || len > 20) {
    errors.password = "비밀번호는 8자 ~ 20자 이하로 입력해주세요.";
  }

  return errors;
}

// 로그인 유효성 검사
export function validateSignin(values: UserSigninInformaion) {
  return validateUser(values);
}

export const addLpSchema = z.object({
  title: z.string().min(1, "제목은 필수입니다."),
  content: z.string().min(1, "설명은 필수입니다."),
  tags: z.array(z.string()),
  thumbnail: z.string().optional(),
  published: z.boolean(),
});
//optional 제거함 왜지

// 폼 입력 타입 (UI 전용)
export type TPostLPInput = z.infer<typeof addLpSchema>;
