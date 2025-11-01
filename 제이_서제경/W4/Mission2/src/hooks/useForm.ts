// useForm hook을 만들어보자

import { useEffect, useState } from "react";

interface UseFormProps<T> {
  initialValues: T; //{email: '', password: ''} - 초기값

  // 유효성 검사 함수 - 값이 올바른지 검증
  validate: (values: T) => Record<keyof T, string>;
}

function useForm<T>({ initialValues, validate }: UseFormProps<T>) {
  const [values, setValues] = useState(initialValues);
  const [touched, setTouched] = useState<Record<string, boolean>>(); //key값은 문자열, value값은 boolean이다.
  const [errors, setErrors] = useState<Record<string, string>>();

  // 사용자가 입력값을 바꿀 때 실행되는 함수이다.
  const handleChange = (name: keyof T, text: string) => {
    setValues({
      ...values, // 불변성 유지(기존 입력값이 유지되도록)
      [name]: text,
    });
  };

  // 사용자가 입력창에서 포커스를 잃었을 때 실행되는 함수이다.
  const handleBlur = (name: keyof T) => {
    setTouched({
      ...touched,
      [name]: true,
    });
  };

  //이메일 인풋, 패스워드 인풋, 속성들을 가져오자
  const getInputProps = (name: keyof T) => {
    const value = values[name];
    const onChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => handleChange(name, e.target.value);
    const onBlur = () => handleBlur(name);

    return {
      value,
      onChange,
      onBlur,
    };
  };

  // values가 변경될 때 마다 에러 검증 로직이 실행됨
  // {email: '이메일 형식이 올바르지 않습니다.', password: '비밀번호는 6자 이상이어야 합니다.'}
  useEffect(() => {
    const newErrors = validate(values);
    setErrors(newErrors); // 오류 메시지 업뎃
  }, [validate, values]);

  return {
    values,
    errors,
    touched,
    getInputProps,
  };
}

export default useForm;
