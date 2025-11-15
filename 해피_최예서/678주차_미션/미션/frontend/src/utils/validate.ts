//validate.ts

export type UseSigninInformation = {
  email: string;
  password: string;
}; // 반드시 email과 password라는 키가 있고, 둘 다 문자열이어야 한다. (객체 구조 강제_

// key: 필드명, value: 에러 메시지
export function validateSignin(
  values: UseSigninInformation, // 매개변수 values 타입 선언 (values = { email: string; password: string } 객체)
): Record<keyof UseSigninInformation, string> {
  // 반환 타입 지정 (“UseSigninInformation 키와 똑같은 키를 갖고, 값은 string인 객체 반환")
  // keyof: key 이름들을 문자열 리터럴 유니온 타입으로 뽑아냄 (즉 여기서 keyof UseSigninInformation 은 "email" | "password"

  // 객체 타입 정의
  const errors: Record<keyof UseSigninInformation, string> = {
    // 초기에는 빈 문자열로 초기화 (아직 에러 없음)
    email: "",
    password: "",
  };

  // 검증해서 틀리면 errors에 메세지 넣어 줌.
  // 이메일 체크
  if (!values.email.includes("@") || !values.email.includes(".")) {
    errors.email = "올바른 이메일 형식을 입력해주세요.";
  }

  // 비밀번호 체크
  if (values.password.length < 6) {
    errors.password = "비밀번호는 최소 6자 이상이어야 합니다.";
  }

  return errors;
}
