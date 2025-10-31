import type { FieldErrors, UseFormRegister } from "react-hook-form";
import type { SignupFormFields } from "../../schemas/authSchemas.ts";

interface PasswordStepProps {
  register: UseFormRegister<SignupFormFields>;
  errors?: FieldErrors<SignupFormFields>;
}

export default function PasswordStep({ register, errors }: PasswordStepProps) {
  return (
    <>
      <input
        {...register("password")}
        type={"password"}
        placeholder="비밀번호를 입력해주세요"
        className={`text-[black] focus:outline-none border px-8 py-2 rounded-xl mb-2 w-80`}
      />

      {errors?.password && (
        <div className="border-[#e14d36]">{errors.password.message}</div>
      )}

      <input
        {...register("passwordCheck")}
        type={"password"}
        placeholder="비밀번호 확인"
        className={`text-[black] focus:outline-none border px-8 py-2 rounded-xl mb-2 w-80`}
      />

      {errors?.passwordCheck && (
        <div className="border-[#e14d36]">{errors.passwordCheck.message}</div>
      )}
    </>
  );
}
