import { useNavigate } from "react-router-dom";
import useForm from "../hooks/useForm";
import { validateSignin, type UserSigninInformation } from "../utils/validate";

const LoginPage = () => {
    const navigate = useNavigate();

    const { values, errors, touched, getInputProps } = useForm<UserSigninInformation>({
        initialValue: {
          email: "",
          password: "",
        },
        validate: validateSignin,
      });
      

    const handleSubmit = () => {
        console.log(values);
    };

    // 오류가 하나라도 있거나, 입력값이 비어있으면 버튼을 비활성화
    const isDisabled: boolean =
        Object.values(errors || {}).some((error: string) => error.length > 0) || // 오류가 있으면 true
        Object.values(values).some((value: string) => value === ""); // 입력값이 비어있으면 true


    return (
        <div className="flex flex-col items-center justify-center h-full gap-4">
            <div className="flex flex-row items-center w-80 px-4 py-2">
                <div 
                onClick={() => navigate('/')}
                className="text-xl cursor-pointer hover:text-pink-500 transition-colors">&lt;</div>
                <div className="flex-1 text-center text-lg font-semibold">로그인</div>
            </div>
            <div className="flex flex-col gap-3">
                <input
                    {...getInputProps("email")}
                className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm
                ${errors?.email && touched?.email ? "border-red-500 bg-red-200" : "border-gray-300"}`}
                type="email"
                placeholder="이메일"
                />
                {errors?.email && touched?.email &&(
                    <div className="text-red-500 text-sm">{errors.email}</div>
                )}
                <input
                    {...getInputProps("password")}
                    className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm
                    ${errors?.password && touched?.password ? "border-red-500 bg-red-200" : "border-gray-300"}`}
                type="password"
                placeholder="비밀번호"
                />
                {errors?.password && touched?.password &&(
                    <div className="text-red-500 text-sm">{errors.password}</div>
                )}
                <button
                type="button"
                onClick={handleSubmit}
                disabled={isDisabled}
                className="w-full bg-blue-600 text-white py-3 rounded-md text-lg font-medium hover:bg-blue-700 transition-colors cursor-pointer disabled:bg-gray-300"
                >
                로그인
                </button>
            </div>
        </div>
      );
      
}

export default LoginPage
