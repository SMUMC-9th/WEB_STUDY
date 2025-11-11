// useForm.ts
import {useState} from "react";

// useForm 훅에 전달할 객체의 타입 정의
interface UseFormProps<T> {
  // <T>: 제네릭, 폼 데이터 구조를 나중에 결정할 수 있게 해 줌 (로그인 폼 & 회원가입 폼 이거 하나로 처리 가능)
  initialValue: T;
  validate: (values: T) => Record<keyof T, string>; // 함수 타입 정의
  // validate : 함수 이름
  // (values : T) : 함수가 매개변수로 받는 값
  // => Record<keyof T, string> 반환타입 (T 객체 키를 그대로 쓰고 값은 string인 객체 반환”)
}

export function useForm<T>({initialValue, validate}: UseFormProps<T>) {
  const [values, setValues] = useState<T>(initialValue); // 현재 입력 값
  const [errors, setErrors] = useState<Record<keyof T, string>>(
    {} as Record<keyof T, string>, // 에러 메세지
  );

  const handleChange = (name: keyof T, value: string) => {
    const newValues = {...values, [name]: value}; //...values: 기존 객체를 모두 복사
    // [name] : value: 특정 필드만 새 값으로 덮어쓰기 name = "email" (동적 키임 배열XX)
    // value = "abcd@gmail.com"
    setValues(newValues); // 상태 변경
    setErrors(validate(newValues)); // validateSignin. 검증 후 에러 상태 반영
  };

  return {values, errors, handleChange}; // 반환 -> 컴포넌트에서 사용 가능
}

// SigninPage.tsx에서 초기값과 validate 함수 전달하며 useForm 호출
// 내부 상태(values, errors) 생성
// input에서 값 바뀌면 handleChange 호출
// values 갱신 → validate함수(즉 validateSignin)에 매개변수 newValues 넣고 실행 → errors 갱신
// 컴포넌트 화면 갱신

