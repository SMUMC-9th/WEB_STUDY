import { type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { postSignup } from "../apis/auth.ts";
import { signupSchema } from "../schemas/authSchemas.ts";
import type { SignupFormFields } from "../schemas/authSchemas.ts";
import { useState } from "react";
import EmailStep from "../components/signup/EmailStep.tsx";
import PasswordStep from "../components/signup/PasswordStep.tsx";
import NicknameStep from "../components/signup/NicknameStep.tsx";

export default function SignupPage() {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    trigger, // 1. trigger 함수를 useForm에서 가져옴
  } = useForm<SignupFormFields>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordCheck: "",
    },
    resolver: zodResolver(signupSchema),
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<SignupFormFields> = async (data) => {
    const { passwordCheck, ...rest } = data;
    try {
      const response = await postSignup(rest);
      console.log("폼 데이터:", rest);
      console.log("회원가입 성공", response);
      // 성공 시 로직 추가 (예: 로그인 페이지로 이동)
      // navigate('/login');
    } catch (error) {
      console.error("회원가입 실패", error);
    }
  };

  // 2. 다음 단계로 넘어가는 함수를 새로 정의
  const handleNextStep = async () => {
    // 현재 단계에 해당하는 필드만 유효성 검사
    const fieldsToValidate =
      step === 1 ? ["email"] : ["password", "passwordCheck"];
    const isValid = await trigger(
      fieldsToValidate as (keyof SignupFormFields)[],
    );

    // 유효성 검사를 통과하면 다음 단계로 이동
    if (isValid) {
      setStep((prev) => prev + 1);
    }
  };

  return (
    <>
      {/* form 태그로 감싸고 handleSubmit(onSubmit)을 연결하는 것이 좋음 */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center justify-center bg-[#eae8d9] min-h-screen p-4"
      >
        <div className=" p-10 rounded-xl">
          <div className="relative flex items-center justify-center mb-6">
            <button
              onClick={() => navigate(-1)}
              // form 안의 button은 기본 type이 submit이므로 button으로 명시
              type="button"
              className="absolute cursor-pointer left-4 text-black mr-5 text-xl font-bold"
            >
              {`<`}
            </button>
            <h1 className="text-[black] text-2xl font-semibold">회원가입</h1>
          </div>

          {step === 1 && <EmailStep register={register} error={errors.email} />}
          {step === 2 && (
            <PasswordStep
              register={register}
              // password와 passwordCheck 에러를 모두 넘겨주는 것이 좋음
              errors={{
                password: errors.password,
                passwordCheck: errors.passwordCheck,
              }}
            />
          )}
          {step === 3 && (
            <NicknameStep register={register} errors={errors.name} />
          )}

          {(step === 1 || step === 2) && (
            <button
              // 3. onClick 핸들러를 새로 만든 함수로 교체
              onClick={handleNextStep}
              type="button"
              disabled={isSubmitting}
              className="w-full bg-[#e14d36] cursor-pointer rounded-xl text-white py-2 mt-2"
            >
              다음
            </button>
          )}
          {step === 3 && (
            <button
              // form의 onSubmit으로 로직이 옮겨졌으므로 onClick은 필요 없음
              // type="submit"으로 변경하여 form 제출을 트리거
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#e14d36] cursor-pointer rounded-xl text-white py-2 mt-2"
            >
              회원가입 완료
            </button>
          )}
        </div>
      </form>
    </>
  );
}
