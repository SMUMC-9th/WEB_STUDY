import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { schema, type FormFields } from "../../schemas/common";
import { postSignup } from "../../apis/auth";
import { ChevronLeft, ChevronRight } from "lucide-react";
import StepEmail from "./steps/StepEmail";
import StepPassword from "./steps/StepPassword";
import StepProfile from "./steps/StepProfile";
import { useNavigate } from "react-router-dom";

type Step = "email" | "password" | "profile";

export default function SignupWizard() {
  const [step, setStep] = useState<Step>("email");
  const navigate = useNavigate();

  const methods = useForm<FormFields>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordCheck: "",
    },
    resolver: zodResolver(schema),
    mode: "onBlur",
  });

  const { handleSubmit, trigger } = methods;

  // 다음 단계 - 유효성 검증 포함
  const next = async () => {
    if (step === "email") {
      const ok = await trigger(["email"]);
      if (ok) setStep("password");
      return;
    }
    if (step === "password") {
      const ok = await trigger(["password", "passwordCheck"]);
      if (ok) setStep("profile");
      return;
    }
  };

  // 이전 단계
  const prev = () => {
    if (step === "profile") setStep("password");
    else if (step === "password") setStep("email");
  };

  // 최종 제출
  const onSubmit = handleSubmit(async (data) => {
    const { passwordCheck, ...rest } = data;
    const res = await postSignup(rest);
    console.log(res, passwordCheck);
    navigate("/login");
  });

  // 헤더 우측 화살표 비활성 조건
  const canGoPrev = step !== "email";
  const canGoNext = step !== "profile";

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] bg-white text-neutral-800">
      <div className="w-[320px] space-y-6">
        {/* 헤더 */}
        <div className="relative h-10 flex items-center justify-center">
          {/* 좌측 화살표 */}
          <button
            type="button"
            onClick={prev}
            disabled={!canGoPrev}
            aria-label="이전 단계"
            className={`absolute left-0 p-1.5 rounded-md transition
              ${
                canGoPrev
                  ? "hover:bg-neutral-100 text-neutral-700"
                  : "text-neutral-300 cursor-not-allowed"
              }`}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* 타이틀 */}
          <h1 className="text-2xl font-semibold tracking-tight select-none">
            회원가입
          </h1>

          {/* 우측 화살표 */}
          <button
            type="button"
            onClick={next}
            disabled={!canGoNext}
            aria-label="다음 단계"
            className={`absolute right-0 p-1.5 rounded-md transition
              ${
                canGoNext
                  ? "hover:bg-neutral-100 text-neutral-700"
                  : "text-neutral-300 cursor-not-allowed"
              }`}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <FormProvider {...methods}>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col gap-4"
            noValidate
          >
            {step === "email" && <StepEmail onNext={next} />}
            {step === "password" && (
              <StepPassword onPrev={prev} onNext={next} />
            )}
            {step === "profile" && (
              <StepProfile onPrev={prev} onSubmit={onSubmit} />
            )}
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
