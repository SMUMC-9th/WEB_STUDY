import { useNavigate } from "react-router-dom";
import useForm from "../hooks/useForm";
import { validateSignin, type UserSigninInformation } from "../utils/validate";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";

const LoginPage = () => {
  const { login, accessToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (accessToken) {
      navigate("/");
    }
  }, [navigate, accessToken]);

  const { values, errors, touched, getInputProps } =
    useForm<UserSigninInformation>({
      initialValue: {
        email: "",
        password: "",
      },
      validate: validateSignin,
    });

  const handleGoogleLogin = () => {
    window.location.href = `${
      import.meta.env.VITE_SERVER_API_URL
    }/v1/auth/google/login`;
  };

  const handleSubmit = async () => {
    await login(values);
    navigate("/my");
  };

  // 오류가 하나라도 있거나, 입력값이 비어있으면 버튼을 비활성화
  const isDisabled: boolean =
    Object.values(errors || {}).some((error: string) => error.length > 0) || // 오류가 있으면 true
    Object.values(values).some((value: string) => value === ""); // 입력값이 비어있으면 true

  return (
    <div className="flex flex-col items-center justify-center h-full gap-6 bg-gray-50 p-6">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
        {/* 헤더 */}
        <div className="flex flex-row items-center mb-6">
          <div
            onClick={() => navigate("/")}
            className="text-2xl cursor-pointer hover:text-[#FF007F] transition-colors"
          >
            &lt;
          </div>
          <div className="flex-1 text-center text-2xl font-bold text-gray-800">
            로그인
          </div>
        </div>

        {/* 구글 로그인 버튼 */}
        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 bg-white border-2 border-gray-300 hover:border-gray-400 hover:shadow-md rounded-lg py-3 px-4 transition-all duration-200 mb-6 group cursor-pointer"
        >
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            className="w-6 h-6"
          >
            <path
              fill="#EA4335"
              d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
            ></path>
            <path
              fill="#4285F4"
              d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
            ></path>
            <path
              fill="#FBBC05"
              d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
            ></path>
            <path
              fill="#34A853"
              d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
            ></path>
            <path fill="none" d="M0 0h48v48H0z"></path>
          </svg>
          <span className="text-gray-700 font-medium group-hover:text-gray-900">
            Sign in with Google
          </span>
        </button>

        {/* 구분선 */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="text-gray-500 text-sm">또는</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        {/* 이메일/비밀번호 로그인 폼 */}
        <div className="flex flex-col gap-4">
          <div>
            <input
              {...getInputProps("email")}
              className={`border w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF007F] transition-all
                                ${
                                  errors?.email && touched?.email
                                    ? "border-red-500 bg-red-50"
                                    : "border-gray-300"
                                }`}
              type="email"
              placeholder="이메일"
            />
            {errors?.email && touched?.email && (
              <div className="text-red-500 text-sm mt-1">{errors.email}</div>
            )}
          </div>

          <div>
            <input
              {...getInputProps("password")}
              className={`border w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF007F] transition-all
                                ${
                                  errors?.password && touched?.password
                                    ? "border-red-500 bg-red-50"
                                    : "border-gray-300"
                                }`}
              type="password"
              placeholder="비밀번호"
            />
            {errors?.password && touched?.password && (
              <div className="text-red-500 text-sm mt-1">{errors.password}</div>
            )}
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={isDisabled}
            className="w-full bg-[#FF007F] text-white py-3 rounded-lg text-lg font-semibold hover:bg-pink-600 transition-colors cursor-pointer disabled:bg-gray-300 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
          >
            로그인
          </button>
        </div>

        {/* 회원가입 링크 */}
        <div className="text-center mt-6">
          <span className="text-gray-600">계정이 없으신가요? </span>
          <button
            onClick={() => navigate("/signup")}
            className="text-[#FF007F] font-semibold hover:underline"
          >
            회원가입
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
