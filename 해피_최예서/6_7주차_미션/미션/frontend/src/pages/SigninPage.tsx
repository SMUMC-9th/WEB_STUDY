// SigninPage.tsx
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import type { UseSigninInformation } from "../utils/validate.ts";
import { validateSignin } from "../utils/validate.ts";
import { useForm } from "../hooks/useForm.ts";
import { postSignin } from "../apis/auth.ts";
import { useLocalStorage } from "../hooks/useLocalStorage.ts";
import { LOCAL_STORAGE_KEY } from "../constants/key.ts";
import { useAuth } from "../context/context.tsx";

export default function SigninPage() {
  // 저장만 필요해서 { setItem, getItem, removeItem } 중 setItem만 꺼냄
  const { setItem } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
  const navigate = useNavigate();

  // useForm에 값 전달 (초기값, 검증 함수)
  // 구조분해할당
  const { setIsLogin } = useAuth();

  const { values, errors, handleChange } = useForm<UseSigninInformation>({
    initialValue: { email: "", password: "" },
    validate: validateSignin,
  });

  const handleSubmit = async () => {
    try {
      const response = await postSignin(values);
      setItem(response.data.accessToken);
      console.log(response);
      setIsLogin(true);
    } catch (error: any) {
      alert(error?.message);
      setIsLogin(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = `${
      import.meta.env.VITE_SERVER_API_URL
    }/v1/auth/google/login`;
  };

  const hasError = !!errors.email || !!errors.password;
  return (
    <div className="flex flex-col items-center justify-center bg-[#eae8d9] min-h-screen p-4">
      <div className=" p-10 rounded-xl">
        <div className="relative flex items-center justify-center mb-6">
          <button
            onClick={() => navigate(-1)}
            className="absolute cursor-pointer left-4 text-black mr-5 text-xl font-bold"
          >
            {`<`}
          </button>
          <h1 className="text-[black] text-2xl font-semibold">로그인</h1>
        </div>

        <div className="flex flex-col justify-center items-center">
          <div className="w-full relative">
            <button
              type={"button"}
              onClick={handleGoogleLogin}
              className="flex justify-center items-center w-full text-[black] border border-[black] rounded-xl px-6 py-2 mb-4 hover:bg-[#e14d36] transition-colors cursor-pointer "
            >
              <FcGoogle size={20} className="absolute left-4" />
              Google Login
            </button>
          </div>
        </div>

        <div className="flex flex-col">
          <p className="text-[black] mb-4">───────── or ─────────</p>
          <input
            type="email"
            value={values.email}
            onChange={(e) => handleChange("email", e.target.value)}
            placeholder="이메일을 입력해주세요."
            className={`text-[black] focus:outline-none border px-8 py-2 rounded-xl mb-2 w-80
              ${errors.email ? "border-[#e14d36]" : "border-gray-300"}`}
          />
          {errors.email && (
            <div className="text-[#e14d36] mb-2 text-sm">{errors.email}</div> // erros.email:  "올바른 이메일 형식을 입력해주세요."
          )}

          <input
            type="password"
            value={values.password}
            onChange={(e) => handleChange("password", e.target.value)}
            placeholder="비밀번호를 입력해주세요."
            className={`text-[black] focus:outline-none border px-8 py-2 rounded-xl mb-2 w-80
              ${errors.password ? "border-[#e14d36]" : "border-gray-300"}`}
          />
          {errors.password && (
            <div className="text-[#e14d36] mb-2 text-sm">{errors.password}</div> // errors.password = "비밀번호는 최소 6자 이상이어야 합니다.";
          )}

          <button
            type={"submit"}
            onClick={handleSubmit}
            disabled={hasError}
            className={`w-80 rounded-xl text-white py-2 mt-4
              ${
                hasError
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-[#e14d36] cursor-pointer"
              }`}
          >
            로그인
          </button>
        </div>
      </div>
    </div>
  );
}
