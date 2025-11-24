import { useFormContext } from "react-hook-form";
import ProfileImage from "../../../assets/profile.jpg";

type Props = { onPrev: () => void; onSubmit: () => void };

export default function StepProfile({ onSubmit }: Props) {
  const {
    register,
    formState: { errors, isSubmitting },
  } = useFormContext();

  const inputBase =
    "w-full rounded-lg border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm outline-none focus:border-gray-400 focus:bg-white transition-all";
  const inputError = "border-red-500 focus:border-red-500";
  const errorText = "mt-1 text-xs text-red-400";

  return (
    <>
      {/* 아바타 */}
      <div className="flex justify-center">
        <div className="w-28 h-28 rounded-full overflow-hidden flex items-center justify-center shadow-sm">
          <img
            src={ProfileImage}
            alt="기본 프로필"
            className="object-cover w-full h-full"
          />
        </div>
      </div>

      <div className="mt-4">
        <input
          {...register("name")}
          type="text"
          placeholder="이름을 입력해주세요!"
          className={`${inputBase} ${errors?.name ? inputError : ""}`}
        />
        {errors?.name && (
          <p className={errorText}>{String(errors.name.message)}</p>
        )}
      </div>

      {/* 회원가입 완료 버튼 */}
      <div className="flex gap-2">
        <button
          type="button"
          onClick={onSubmit}
          disabled={isSubmitting}
          className="w-full mt-2 bg-neutral-900 text-white rounded-lg py-2.5 text-sm font-medium hover:bg-neutral-800 active:bg-neutral-900 transition-colors shadow-sm"
        >
          회원가입 완료
        </button>
      </div>
    </>
  );
}
