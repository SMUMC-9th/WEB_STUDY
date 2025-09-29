import { z } from "zod";
import { type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
// schema = 규칙 정의
// FormFields = 타입 자동 생성
// useForm = 상태 관리 + 스키마랑 연결

// 1) Zod로 스키마 만들기
const schema = z.object({
  // 이메일 형식
  email: z.string().email({ message: "올바른 이메일 형식이 아닙니다." }),

  // 8 <= password <=20
  password: z
    .string()
    .min(8, {
      message: "비밀번호는 8자 이상이어야 합니다.",
    })
    .max(20, {
      message: "비밀번호는 20자 이하여야 합니다.",
    }),

  // name: 빈 문자열이면 안됨
  name: z.string().min(1, {
    message: "이름을 입력해주세요",
  }),
});

// 2) Zod로 TS 타입 뽑기
type FormFields = z.infer<typeof schema>;
// z.infer: 스키마대로 타입스크립트 타입 만들라는 뜻

export default function SignupPage() {
  const navigate = useNavigate();

  // 3) RHF
  // useForm<FormFields>: react-hook-form을 쓸 때 입력값 구조가 FormFields와 같아야 한다고 지정.
  const {
    register, // register : input을 react-hook-form에 연결하는 함수
    handleSubmit,
    formState: { errors, isSubmitting }, // 구조 분해 할당
    // formState.errors: 유효성 검사 실패 시 에러 메시지 들어 있음
    // formState.isSubmitting: 제출 중이면 true → 버튼 비활성화 등에 사용
  } = useForm<FormFields>({
    defaultValues: {
      // 폼 초기값
      name: "",
      email: "",
      password: "",
    },
    resolver: zodResolver(schema), // resolver: Zod 스키마랑 RHF 연결하마
    mode: "onChange", // mode: 언제 유효성 검사를 실행할지 결정.
    // "onChange" : 실시간 검사
  });

  // 레지스터에 연결된 값 가져오기
  const onSubmit: SubmitHandler<FormFields> = (data) => {
    console.log("폼 데이터:", data);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center bg-[#eae8d9] min-h-screen p-4">
        <div className=" p-10 rounded-xl">
          <div className="flex items-center justify-center mb-6">
            <button
              onClick={() => navigate(-1)}
              className="text-black mr-5 text-xl font-bold"
            >
              {`<`}
            </button>
            <h1 className="text-[black] text-2xl font-semibold">회원가입</h1>
          </div>

          <div className="flex flex-col justify-center items-center">
            <button className="w-full text-[black] border border-[black] rounded-xl px-6 py-2 mb-4 hover:bg-[#e06933] transition-colors">
              구글 로그인
            </button>
            <p className="text-[black] mb-4">───────── or ─────────</p>
          </div>

          <div className="flex flex-col">
            <input
              {...register("email")}
              type={"email"}
              className={`text-[black] focus:outline-none border px-8 py-2 rounded-xl mb-2 w-80`}
              placeholder="이메일을 입력해주세요."
            />

            {errors.email && (
              <div className="text-red-500 text-sm mb-2">
                {errors.email.message}
              </div>
            )}

            <input
              {...register("password")}
              type={"password"}
              placeholder="비밀번호를 입력해주세요"
              className={`text-[black] focus:outline-none border px-8 py-2 rounded-xl mb-2 w-80`}
            />

            {errors.password && (
              <div className="border-[#e14d36]">{errors.password.message}</div>
            )}

            <input
              {...register("name")}
              type={"text"}
              placeholder="이름"
              className={`text-[black] focus:outline-none border px-8 py-2 rounded-xl mb-2 w-80`}
            />

            {errors.name && (
              <div className="border-[#e14d36]">{errors.name.message}</div>
            )}

            <button onClick={handleSubmit(onSubmit)} type="button">
              회원가입
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
