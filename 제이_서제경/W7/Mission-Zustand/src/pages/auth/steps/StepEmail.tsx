import { useFormContext } from "react-hook-form";

type Props = { onNext: () => void };

export default function StepEmail({ onNext }: Props) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const handleGoogleLogin = () => {
    window.location.href =
      import.meta.env.VITE_SERVER_API_URL + "/v1/auth/google/login";
  };

  const inputBase =
    "w-full rounded-lg border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm outline-none focus:border-gray-400 focus:bg-white transition-all";
  const inputError = "border-red-500 bg-red-200";
  const errorText = "mt-1 text-xs text-red-400";

  return (
    <>
      <button
        type="button"
        className="flex items-center justify-center gap-5 w-full border border-gray-400 rounded-md py-2.5 text-sm font-medium transition-all"
        onClick={handleGoogleLogin}
      >
        <img
          src="https://www.svgrepo.com/show/355037/google.svg"
          alt="Google"
          className="w-5 h-5"
        />
        구글 로그인
      </button>

      {/* OR 구분선 */}
      <div className="flex items-center w-full gap-2 text-gray-300 text-xs">
        <div className="flex-1 h-px bg-gray-300"></div>
        OR
        <div className="flex-1 h-px bg-gray-300"></div>
      </div>

      <div>
        <input
          {...register("email")}
          type="email"
          placeholder="이메일을 입력해주세요!"
          className={`${inputBase} ${errors?.email ? inputError : ""}`}
        />
        {errors?.email && (
          <p className={errorText}>{String(errors.email.message)}</p>
        )}
      </div>

      <button
        type="button"
        onClick={onNext}
        className="w-full mt-2 bg-neutral-900 text-white rounded-lg py-2.5 text-sm font-medium hover:bg-neutral-800 active:bg-neutral-900 transition-colors shadow-sm"
      >
        다음
      </button>
    </>
  );
}
