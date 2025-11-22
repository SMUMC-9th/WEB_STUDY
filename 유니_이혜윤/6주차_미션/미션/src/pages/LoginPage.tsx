import useForm from "../hooks/useForm";
import { validateSignin, type UserSigninInformation } from "../utils/validate";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, accessToken } = useAuth();

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

  const handleSubmit = async () => {
    await login(values);
  };

  const handleGoogleLogin = () => {
    window.location.href =
      import.meta.env.VITE_SERVER_API_URL + "/v1/auth/google/login";
  };

  const isDisabled =
    Object.values(errors || {}).some((e) => e.length > 0) || // 오류 있으면 true
    Object.values(values).some((v) => v === ""); // 입력값 비어있으면 true

  return (
    <div className="flex flex-col items-center justify-center h-full gap-4">
      <div className="flex flex-col gap-3">
        <input
          {...getInputProps("email")}
          name="email"
          type="email"
          className={`border border-[#ccc] w-[300px] p-2 rounded-sm
        ${
          errors?.email && touched?.email
            ? "border-red-400 bg-red-100"
            : "border-gray-300"
        } focus:border-[#888] focus:outline-none`}
          placeholder="email"
        />
        {errors?.email && touched?.email && (
          <div className="text-red-400 text-sm">{errors.email}</div>
        )}

        <input
          {...getInputProps("password")}
          name="password"
          type="password"
          className={`border border-[#ccc] w-[300px] p-2 rounded-sm
        ${
          errors?.password && touched?.password
            ? "border-red-400 bg-red-100"
            : "border-gray-300"
        } focus:border-[#888] focus:outline-none`}
          placeholder="password"
        />
        {errors?.password && touched?.password && (
          <div className="text-red-400 text-sm">{errors.password}</div>
        )}

        <button
          type="button"
          onClick={handleSubmit}
          disabled={isDisabled}
          className="bg-blue-100 text-white rounded-sm p-2 w-full cursor-pointer hover:bg-blue-200 transition-colors disabled:bg-gray-300 focus:outline-none"
        >
          login
        </button>
        <div
          className="flex justify-center items-center gap-2 bg-gray-200 p-2 rounded cursor-pointer"
          onClick={handleGoogleLogin}
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png"
            alt="Google Logo"
            className="w-5 h-5"
          />
          <span>구글 로그인</span>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
