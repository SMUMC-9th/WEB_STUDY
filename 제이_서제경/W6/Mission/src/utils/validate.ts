import { z } from "zod";

export type UserSigninInformaion = {
  email: string;
  password: string;
};

function validateUser(values: UserSigninInformaion) {
  const errors = {
    email: "",
    password: "",
  };

  if (
    !/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i.test(
      values.email
    )
  ) {
    errors.email = "이메일 형식이 올바르지 않습니다.";
  }

  //비밀번호는 8자~20자 사이
  if (values.password.length > 8 || values.password.length < 20) {
    errors.password = "비밀번호는 8자 ~ 20자 이하로 입력해주세요.";
  }

  return errors;
}

// 로그인 유효성 검사
function validateSignin(values: UserSigninInformaion) {
  return validateUser(values);
}
export { validateSignin };

const addLpSchema = z.object({
  // 문자열 최소 1자 이상
  title: z.string().min(1, "제목을 입력해주세요."),
  content: z.string().min(1, "내용을 입력해주세요."),

  // string | null → 두 타입 모두 허용
  thumbnail: z.union([
    z.string().url("유효한 이미지 URL이 아닙니다."),
    z.null(),
  ]),

  // 문자열 배열 (비어 있으면 안 됨)
  tags: z.array(z.string()).min(1, "태그를 하나 이상 입력해주세요."),

  // boolean
  published: z.boolean(),
});
export default addLpSchema;
