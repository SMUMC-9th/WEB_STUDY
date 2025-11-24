import { useNavigate } from "react-router-dom";
import { useForm } from "../hooks/useForm";
import { signIn } from "../api/auth";
import { ChevronLeft } from "lucide-react";
import type { AxiosError } from "axios";
import { useAuthStore } from "../context/useAuthStore";

export default function Auth() {
  const navigate = useNavigate();
  // const { login } = useAuth();
  const { login } = useAuthStore();
  const { values, handleChange, errors, validateField } = useForm({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    validateField("email", values.email ?? "");
    validateField("password", values.password ?? "");

    if (errors.email || errors.password) return;

    try {
      const data = await signIn({
        email: values.email ?? "",
        password: values.password ?? "",
      });

      //loacalStorage에 토큰 저장
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);

      //Context의 login 함수 호출
      login({ id: data.id, name: data.name });

      console.log("로그인 성공:", data);
      navigate("/my");
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      const message =
        err.response?.data?.message ?? err.message ?? "로그인 실패";
      console.error("로그인 실패:", err);
      alert(message);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = `${
      import.meta.env.VITE_API_BASE_URL
    }/v1/auth/google/login`;
  };

  const isValid =
    !!values.email &&
    !!values.password &&
    values.password.length >= 6 &&
    !errors.email &&
    !errors.password;

  return (
    <div className="flex flex-col min-h-screen justify-center items-center text-white">
      <div className="w-full max-w-sm">
        <div className="relative flex items-center justify-center mb-6">
          <button
            onClick={() => navigate(-1)}
            className="absolute left-0 p-2 rounded-full hover:bg-gray-800"
          >
            <ChevronLeft />
          </button>
          <h1 className="text-xl font-semibold">로그인</h1>
        </div>
        <button
          className="w-full flex items-center justify-center gap-2 py-3 bg-white text-gray-900 rounded-xl font-medium shadow hover:bg-gray-100"
          onClick={handleGoogleLogin}
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5"
          />
          구글로 로그인
        </button>{" "}
        <div className="flex items-center my-6">
          <div className="flex-grow h-px bg-gray-700" />
          <span className="px-3 text-sm text-gray-400">or</span>
          <div className="flex-grow h-px bg-gray-700" />
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <input
              type="email"
              name="email"
              value={values.email}
              placeholder="이메일"
              className="w-full px-4 py-3 rounded-xl bg-black/50 border border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
              onChange={(e) => {
                handleChange(e);
                validateField("email", e.target.value);
              }}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <input
              type="password"
              name="password"
              value={values.password}
              placeholder="비밀번호"
              className="w-full px-4 py-3 rounded-xl bg-black/50 border border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
              onChange={(e) => {
                handleChange(e);
                validateField("password", e.target.value);
              }}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={!isValid}
            className={`w-full py-3 rounded-xl font-semibold shadow ${
              isValid
                ? "bg-pink-500 hover:bg-pink-600"
                : "bg-pink-500/50 cursor-not-allowed"
            }`}
          >
            로그인
          </button>
        </form>
      </div>
    </div>
  );
}
