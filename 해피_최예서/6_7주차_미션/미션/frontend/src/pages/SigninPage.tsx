import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import type { UseSigninInformation } from "../utils/validate.ts";
import { validateSignin } from "../utils/validate.ts";
import { useForm } from "../hooks/useForm.ts";
import { useLocalStorage } from "../hooks/useLocalStorage.ts";
import { LOCAL_STORAGE_KEY } from "../constants/key.ts";
import { useAuth } from "../context/context.tsx";
import usePostSignin from "../hooks/mutations/user/usePostSignin.ts";

export default function SigninPage() {
  const { setItem } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
  const navigate = useNavigate();
  const { setIsLoginState } = useAuth();
  const { mutate: signinMutate, isPending } = usePostSignin();

  const { values, errors, handleChange } = useForm<UseSigninInformation>({
    initialValue: { email: "", password: "" },
    validate: validateSignin,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    signinMutate(values, {
      onSuccess: (response) => {
        const accessToken = response.data.accessToken;
        const refreshToken = response.data.refreshToken;
        setItem(accessToken);
        localStorage.setItem(LOCAL_STORAGE_KEY.refreshToken, refreshToken);
        setIsLoginState(true);
        navigate("/");
      },
      onError: (error) => {
        console.error("로그인 실패:", error);
        alert("이메일 또는 비밀번호를 확인해주세요.");
        setIsLoginState(false);
      },
    });
  };

  const handleGoogleLogin = () => {
    window.location.href = `${import.meta.env.VITE_SERVER_API_URL}/v1/auth/google/login`;
  };

  const hasError = !!errors.email || !!errors.password;

  return (
    <div className="flex flex-col items-center justify-center bg-[#eae8d9] min-h-screen p-4">
      <div className="p-10 rounded-xl">
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
              type="button"
              onClick={handleGoogleLogin}
              className="flex justify-center items-center w-full text-[black] border border-[black] rounded-xl px-6 py-2 mb-4 hover:bg-[#e14d36] transition-colors cursor-pointer"
            >
              <FcGoogle size={20} className="absolute left-4" />
              Google Login
            </button>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center items-center"
        >
          <p className="text-[black] mb-4">───────── or ─────────</p>

          <input
            type="email"
            value={values.email}
            onChange={(e) => handleChange("email", e.target.value)}
            placeholder="이메일을 입력해주세요."
            className={`text-[black] focus:outline-none border px-8 py-2 rounded-xl mb-2 w-80 ${
              errors.email ? "border-[#e14d36]" : "border-gray-300"
            }`}
          />
          {errors.email && (
            <div className="text-[#e14d36] mb-2 text-sm">{errors.email}</div>
          )}

          <input
            type="password"
            value={values.password}
            onChange={(e) => handleChange("password", e.target.value)}
            placeholder="비밀번호를 입력해주세요."
            className={`text-[black] focus:outline-none border px-8 py-2 rounded-xl mb-2 w-80 ${
              errors.password ? "border-[#e14d36]" : "border-gray-300"
            }`}
          />
          {errors.password && (
            <div className="text-[#e14d36] mb-2 text-sm">{errors.password}</div>
          )}

          <button
            type="submit"
            disabled={hasError || isPending}
            className={`w-80 rounded-xl text-white py-2 mt-4 ${
              hasError || isPending
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-[#e14d36] cursor-pointer hover:bg-[#c63b2a]"
            }`}
          >
            {isPending ? "로그인 중..." : "로그인"}
          </button>
        </form>
      </div>
    </div>
  );
}
