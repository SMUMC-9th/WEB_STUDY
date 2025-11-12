import { useState, useEffect } from "react";
import { postLogin } from "../../apis/auth";
import useForm from "../../hooks/useForm";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { LOCAL_STORAGE_KEY } from "../../constants/key";
import {
  validateSignin,
  type UserSigninInformaion,
} from "../../utils/validate";

export default function LoginPage() {
  // 로컬스토리지에 accessToken 저장용 커스텀 훅
  const { setItem } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);

  // 버튼 비활성화 상태 관리
  const [isDisabled, setIsDisabled] = useState(true);

  // useForm 훅을 통한 입력값 / 에러 / touched 상태 관리
  const { values, errors, touched, getInputProps } =
    useForm<UserSigninInformaion>({
      initialValues: {
        email: "",
        password: "",
      },
      validate: validateSignin, // 이메일·비밀번호 유효성 검사
    });

  // 로그인 요청 함수
  const handleSubmit = async () => {
    try {
      const response = await postLogin(values);
      setItem(response.data.accessToken);
      alert("로그인 성공!");
      window.location.href = "/"; // 로그인 성공 시 홈으로 이동
    } catch (error) {
      console.error("로그인 실패:", error);
      alert("로그인 실패. 이메일 또는 비밀번호를 확인하세요.");
    }
  };

  // 구글 로그인
  const handleGoogleLogin = () => {
    window.location.href =
      import.meta.env.VITE_SERVER_API_URL + "/v1/auth/google/login";
  };

  // 입력값과 에러 상태에 따라 버튼 활성화 여부 갱신
  useEffect(() => {
    const isFormValid =
      values.email.trim() !== "" &&
      values.password.trim() !== "" &&
      !errors?.email &&
      !errors?.password;
    setIsDisabled(!isFormValid);
  }, [values, errors]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] bg-white text-neutral-800">
      <div className="w-[320px] space-y-6">
        {/* 타이틀 */}
        <div className="text-center">
          <h1 className="text-2xl font-semibold tracking-tight">로그인</h1>
          <p className="text-sm text-neutral-500 mt-1">
            UMsiC에 오신 걸 환영합니다.
          </p>
        </div>

        {/* 🔹 구글 로그인 버튼 */}
        <div className="flex flex-col items-center gap-5">
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="flex items-center justify-center gap-2 w-full border border-gray-300 rounded-lg py-2.5 text-sm font-medium bg-white hover:bg-gray-50 transition-all active:scale-[0.98]"
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

        {/* 🔹 이메일/비밀번호 로그인 폼 */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="flex flex-col gap-3"
        >
          {/* 이메일 입력 */}
          <input
            {...getInputProps("email")}
            type="email"
            placeholder="이메일"
            className={`w-full rounded-lg border px-3.5 py-2.5 text-sm outline-none transition-all
              ${
                errors?.email && touched?.email
                  ? "border-red-400 bg-red-50 focus:border-red-500"
                  : "border-gray-300 bg-gray-50 focus:border-gray-400 focus:bg-white"
              }`}
          />
          {errors?.email && touched?.email && (
            <div className="text-red-500 text-xs -mt-1">{errors.email}</div>
          )}

          {/* 비밀번호 입력 */}
          <input
            {...getInputProps("password")}
            type="password"
            placeholder="비밀번호"
            className={`w-full rounded-lg border px-3.5 py-2.5 text-sm outline-none transition-all
              ${
                errors?.password && touched?.password
                  ? "border-red-400 bg-red-50 focus:border-red-500"
                  : "border-gray-300 bg-gray-50 focus:border-gray-400 focus:bg-white"
              }`}
          />
          {errors?.password && touched?.password && (
            <div className="text-red-500 text-xs -mt-1">{errors.password}</div>
          )}

          {/* 로그인 버튼 */}
          <button
            type="submit"
            disabled={isDisabled}
            className={`w-full mt-2 rounded-lg py-2.5 text-sm font-medium shadow-sm transition-all duration-200
              ${
                isDisabled
                  ? "bg-neutral-300 text-white cursor-not-allowed"
                  : "bg-neutral-900 text-white hover:bg-neutral-800 active:bg-neutral-900"
              }`}
          >
            로그인
          </button>
        </form>

        {/* 회원가입 링크 */}
        <div className="text-center text-sm text-neutral-500">
          계정이 없으신가요?{" "}
          <a
            href="/signup"
            className="text-neutral-900 hover:underline font-medium"
          >
            회원가입
          </a>
        </div>
      </div>
    </div>
  );
}
