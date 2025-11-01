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
