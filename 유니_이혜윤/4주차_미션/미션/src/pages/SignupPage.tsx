import { z } from "zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { postSignup } from "../apis/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MailCheck } from "lucide-react";
import PasswordInput from "../components/PasswordInput";

// 스키마 & 타입
const schema = z
  .object({
    email: z.string().email({ message: "올바른 이메일 형식이 아닙니다." }),
    password: z
      .string()
      .min(6, { message: "비밀번호는 6자 이상이어야 합니다." })
      .max(12, { message: "비밀번호는 12자 이하여야 합니다." }),
    passwordCheck: z
      .string()
      .min(6, { message: "비밀번호는 6자 이상이어야 합니다." })
      .max(12, { message: "비밀번호는 12자 이하여야 합니다." }),
    name: z.string().min(1, { message: "이름을 입력해주세요." }),
  })
  .refine((data) => data.password === data.passwordCheck, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["passwordCheck"],
  });

type FormFields = z.infer<typeof schema>;

const SignupPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<0 | 1 | 2>(0);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    trigger,
    watch,
  } = useForm<FormFields>({
    defaultValues: {
      email: "",
      password: "",
      passwordCheck: "",
      name: "",
    },
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  // 1단계
  const email = watch("email");
  const isEmailValid = !!email && !errors.email;

  // 2단계
  const password = watch("password");
  const passwordCheck = watch("passwordCheck");
  const isPasswordValid =
    !!password && !!passwordCheck && !errors.password && !errors.passwordCheck;

  // 3단계
  const nameValue = watch("name");
  const isNameValid = !!nameValue && !errors.name;

  // 단계 이동
  const goNextFromEmail = async () => {
    const ok = await trigger("email");
    if (ok) setStep(1);
  };

  const goNextFromPassword = async () => {
    const ok = await trigger(["password", "passwordCheck"]);
    if (ok) setStep(2);
  };

  const goPrev = () => setStep((s) => (s === 0 ? 0 : ((s - 1) as 0 | 1 | 2)));

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    const { ...payload } = data;
    await postSignup(payload);
    navigate("/login");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh]">
      <div className="w-[360px] bg-white rounded-lg shadow p-7">
        {/* 단계 표시 */}
        <div className="flex items-center justify-center gap-3 mb-5 text-sm text-gray-300">
          <span className={step === 0 ? "font-bold text-gray-700" : ""}>1</span>{" "}
          →
          <span className={step === 1 ? "font-bold text-gray-700" : ""}>2</span>{" "}
          →
          <span className={step === 2 ? "font-bold text-gray-700" : ""}>3</span>
        </div>

        {/* 1단계: 이메일 */}
        {step === 0 && (
          <div className="flex flex-col gap-3">
            <input
              {...register("email")}
              type="email"
              className={`border w-full p-2 rounded-sm focus:outline-none  ${
                errors.email ? "border-red-400 bg-red-100" : "border-gray-300"
              }`}
              placeholder="이메일을 입력하세요."
            />
            {errors.email && (
              <p className="text-xs text-red-400">{errors.email.message}</p>
            )}

            <button
              type="button"
              disabled={!isEmailValid}
              onClick={goNextFromEmail}
              className="mt-2 w-full bg-blue-300 text-white py-2 rounded-md disabled:bg-gray-300 hover:bg-blue-400 transition-colors"
            >
              다음
            </button>
          </div>
        )}

        {/* 2단계: 비밀번호 & 확인 */}
        {step === 1 && (
          <div className="flex flex-col">
            {/* 상단 이메일 표시 */}
            <div className="flex items-center p-3 bg-gray-50 rounded border text-sm text-gray-600 mb-5">
              <span className="mr-2">
                <MailCheck />
              </span>{" "}
              {email || "(미입력)"}
            </div>

            <label className="text-sm text-gray-700 pl-1">비밀번호</label>
            <PasswordInput
              register={register}
              name="password"
              placeholder="비밀번호를 입력해주세요."
              error={errors.password?.message}
            />

            <label className="text-sm text-gray-700 pl-1">비밀번호 확인</label>
            <PasswordInput
              register={register}
              name="passwordCheck"
              placeholder="비밀번호를 다시 한 번 입력해주세요."
              error={errors.passwordCheck?.message}
            />

            <div className="flex gap-2">
              <button
                type="button"
                onClick={goPrev}
                className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-md hover:bg-gray-300"
              >
                이전
              </button>
              <button
                type="button"
                disabled={!isPasswordValid}
                onClick={goNextFromPassword}
                className="flex-1 bg-blue-300 text-white py-2 rounded-md disabled:bg-gray-300 hover:bg-blue-400 transition-colors"
              >
                다음
              </button>
            </div>
          </div>
        )}

        {/* 3단계: 닉네임 → 완료 시 로그인 페이지 */}
        {step === 2 && (
          <div className="flex flex-col items-center gap-3">
            <img
              src={
                "https://i.pinimg.com/736x/ee/5c/aa/ee5caacd1bb467e148a0bd25ce464dd0.jpg"
              }
              alt="프로필 이미지"
              className="w-28 h-28 rounded-full object-cover"
            />
            <input
              {...register("name")}
              type="text"
              className={`border w-full p-2 mt-3 rounded-sm focus:outline-none ${
                errors.name ? "border-red-400 bg-red-100" : "border-gray-300"
              }`}
              placeholder="닉네임을 입력하세요"
            />
            {errors.name && (
              <p className="text-xs text-red-400">{errors.name.message}</p>
            )}

            <div className="flex w-full gap-2 mt-2">
              <button
                type="button"
                onClick={goPrev}
                className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-md hover:bg-gray-300"
              >
                이전
              </button>
              <button
                type="button"
                disabled={!isNameValid || isSubmitting}
                onClick={handleSubmit(onSubmit)}
                className="flex-1 bg-blue-300 text-white py-2 rounded-md disabled:bg-gray-300 hover:bg-blue-400 transition-colors"
              >
                회원가입 완료
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignupPage;
