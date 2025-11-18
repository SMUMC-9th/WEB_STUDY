import { useNavigate, Link, useLocation } from "react-router-dom";
import useForm from "../hooks/useForm";

import { useAuth } from "../context/AuthContext";
import { loginSchema, type LoginForm } from "../schemas/authSchema";

const LoginPage = () => {
  const nav = useNavigate();
  const { login } = useAuth();
  const location = useLocation();

  //돌아갈 경로 찾음. state나 from 없으면 홈으로 가도록 설정.
  const from = location.state?.from?.pathname || "/";
  // const {setItem} = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);

  const { errors, getInputProps, handleSubmit } = useForm<LoginForm>({
    initialValue: { email: "", password: "" },
    validate: (values) => {
      const errors: Record<keyof LoginForm, string> = {
        email: "",
        password: "",
      };

      const emailCheck = loginSchema
        .pick({ email: true })
        .safeParse({ email: values.email });
      if (!emailCheck.success) {
        errors.email = emailCheck.error.issues[0].message;
      }
      const pwdCheck = loginSchema
        .pick({ password: true })
        .safeParse({ password: values.password });
      if (!pwdCheck.success) {
        errors.password = pwdCheck.error.issues[0].message;
      }

      return errors;
    },
    onSubmit: async (values) => {
      try {
        const success = await login(values);
        if (success) {
          alert("로그인 성공!");
          //mypage가 아니고, 원래 가려고 했던 페이지from으로 이동시킴.
          nav(from, { replace: true });
        }
      } catch (error) {
        console.error("로그인실패: ", error);
        alert("로그인 중 알 수 없는 오류가 발생하였습니다");
      }
    },
  });

  const handleGoogleLogin = () => {
    window.location.href =
      import.meta.env.VITE_SERVER_API_URL + "/v1/auth/google/login";
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen text-white">
      <div className="w-full max-w-sm p-6 rounded-lg">
        <div className="relative flex items-center mb-4">
          <button
            onClick={() => nav(-1)}
            className="mb-4 text-gray-200 text-3xl absolute left-0 cursor-pointer hover:text-[#434343]"
          >
            {`<`}
          </button>
          <h2 className="font-bold text-2xl text-center w-full mb-3">로그인</h2>
        </div>

        <button
          onClick={handleGoogleLogin}
          className="relative w-full flex items-center justify-center gap-2 py-2 px-4 mb-4 border border-gray-300 rounded-md hover:bg-[#c3c3c3] hover:text-gray-950 cursor-pointer"
        >
          <img
            src="/google_logo.png"
            alt="구글 Logo"
            className="absolute left-4 w-5 h-5"
          />
          구글 로그인
        </button>

        <div className="flex items-center gap-2 my-4">
          <div className="flex-1 h-px bg-gray-300" />
          <span className="mx-8 text-sm text-gray-300">OR</span>
          <div className="flex-1 h-px bg-gray-300" />
        </div>

        <form onSubmit={handleSubmit}>
          <input
            placeholder="이메일을 입력해주세요"
            type="text"
            className="w-full p-2 mb-3 bg-[#161616] border border-gray-300 rounded-md"
            {...getInputProps("email")}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mb-2">{errors.email}</p>
          )}

          <input
            placeholder="비밀번호를 입력해주세요"
            type="password"
            className="w-full p-2 mb-3 bg-[#161616] border border-gray-300 rounded-md"
            {...getInputProps("password")}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mb-2">{errors.password}</p>
          )}

          <button
            type="submit"
            className="w-full rounded-md bg-[#161616] p-2 mt-1 text-[#919191] cursor-pointer hover:bg-[#ff349a] hover:text-gray-300"
          >
            로그인
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-400">
          아직 계정이 없으신가요?
          <Link to="/signup" className="text-[#ff349a] hover:underline ml-2">
            회원가입
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
