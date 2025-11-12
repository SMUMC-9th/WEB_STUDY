import useForm from "../../hooks/useForm";
import {
  validateSignin,
  type UserSigninInformaion,
} from "../../utils/validate";

export default function LoginPage() {
  // useForm 훅을 사용하여 폼 상태 관리 및 유효성 검사 로직을 처리
  const { values, errors, touched, getInputProps } =
    useForm<UserSigninInformaion>({
      initialValues: {
        email: "",
        password: "",
      },
      validate: validateSignin,
    });

  // 로그인 버튼 클릭 시 실행되는 함수
  const handleSubmit = () => {
    console.log("폼 제출:", values);
  };

  // 에러가 있거나 입력값이 비어있으면 버튼 비활성화
  const isDisabled =
    Object.values(errors || {}).some((error) => error.length > 0) || //오류가 있으면 true
    Object.values(values).some((value) => value === ""); //입력값이 비어있으면 true

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] bg-white text-neutral-800">
      <div className="w-[320px] space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-semibold tracking-tight">로그인</h1>
          <p className="text-sm text-neutral-500 mt-1">
            UMsiC에 오신 걸 환영합니다.
          </p>
        </div>
        {/* 구글 로그인 */}
        <div className="flex flex-col items-center gap-5">
          <button
            type="button"
            className="flex items-center justify-center gap-2 w-full border border-gray-400 rounded-md py-2.5 text-sm font-medium transition-all"
          >
            <img
              src="https://www.svgrepo.com/show/355037/google.svg"
              alt="Google"
              className="w-4 h-4"
            />
            구글 로그인
          </button>

          {/* OR 구분선 */}
          <div className="flex items-center w-full gap-2 text-gray-300 text-xs">
            <div className="flex-1 h-px bg-gray-300"></div>
            OR
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="flex flex-col gap-3"
        >
          {/*이메일 입력 필드 */}
          <input
            {...getInputProps("email")}
            type="email"
            placeholder="이메일"
            className={`w-full rounded-lg border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm outline-none focus:border-gray-400 focus:bg-white transition-all
                ${
                  errors?.email && touched?.email
                    ? "border-red-500 bg-red-200"
                    : "border-gray-300"
                }`}
          />
          {errors?.email && touched?.email && (
            <div className="text-red-500 text-sm">{errors.email}</div>
          )}

          {/*비밀번호 입력 필드 */}
          <input
            {...getInputProps("password")}
            type="password"
            placeholder="비밀번호"
            className={`w-full rounded-lg border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm outline-none focus:border-gray-400 focus:bg-white transition-all
                ${
                  errors?.password && touched?.password
                    ? "border-red-500 bg-red-200"
                    : "border-gray-300"
                }`}
          />
          {errors?.password && touched?.password && (
            <div className="text-red-500 text-sm">{errors.password}</div>
          )}

          {/* 로그인 버튼 */}
          <button
            type="submit"
            className={`w-full mt-2 bg-neutral-900 text-white rounded-lg py-2.5 text-sm font-medium hover:bg-neutral-800 active:bg-neutral-900 transition-colors shadow-sm
                ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={isDisabled}
          >
            로그인
          </button>
        </form>

        <div className="text-center text-sm text-neutral-500">
          계정이 없으신가요?{" "}
          <a
            href="/signup"
            className="text-neutral-800 hover:underline font-medium"
          >
            회원가입
          </a>
        </div>
      </div>
    </div>
  );
}
