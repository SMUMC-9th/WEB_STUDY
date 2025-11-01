import { useFormContext, useWatch } from "react-hook-form";
import { Mail } from "lucide-react";

type Props = { onPrev: () => void; onNext: () => void };

export default function StepPassword({ onNext }: Props) {
  const {
    register,
    formState: { errors },
    control,
  } = useFormContext();

  const email = useWatch({ control, name: "email" });

  const inputBase =
    "w-full rounded-lg border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm outline-none focus:border-gray-400 focus:bg-white transition-all";
  const inputError = "border-red-500 focus:border-red-500";
  const errorText = "mt-1 text-xs text-red-400";

  return (
    <>
      <div className="flex items-center gap-2 text-sm text-gray-400">
        <Mail className="w-4 h-4" />
        <span className="truncate">{email}</span>
      </div>

      <div>
        <input
          {...register("password")}
          type="password"
          placeholder="비밀번호를 입력해주세요!"
          className={`${inputBase} ${errors?.password ? inputError : ""}`}
        />
        {errors?.password && (
          <p className={errorText}>{String(errors.password.message)}</p>
        )}
      </div>

      <div>
        <input
          {...register("passwordCheck")}
          type="password"
          placeholder="비밀번호를 다시 한 번 입력해주세요!"
          className={`${inputBase} ${errors?.passwordCheck ? inputError : ""}`}
        />
        {errors?.passwordCheck && (
          <p className={errorText}>{String(errors.passwordCheck.message)}</p>
        )}
      </div>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={onNext}
          className="w-full mt-2 bg-neutral-900 text-white rounded-lg py-2.5 text-sm font-medium hover:bg-neutral-800 active:bg-neutral-900 transition-colors shadow-sm"
        >
          다음
        </button>
      </div>
    </>
  );
}
