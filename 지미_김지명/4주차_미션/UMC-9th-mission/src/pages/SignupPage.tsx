import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import z from "zod";
import { postSignup } from "../api/auth";

const schema = z.object({
    email: z.string().email({ message: "올바른 이메일 형식이 아닙니다." }),
    password: z
      .string()
      .min(8, {
        message: "비밀번호는 8자 이상이어야 합니다.",
      })
      .max(20, {
        message: "비밀번호는 20자 이하여야 합니다.",
      }),
    passwordCheck: z
      .string()
      .min(8, {
        message: "비밀번호는 8자 이상이어야 합니다.",
      })
      .max(20, {
        message: "비밀번호는 20자 이하여야 합니다.",
      }),
    name: z.string().min(1, { message: "이름을 입력해주세요." }),
}).refine((data) => data.password === data.passwordCheck, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["passwordCheck"]
});
  
type FormFields = z.infer<typeof schema>;

const SignupPage = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1); // 1: 이메일, 2: 비밀번호, 3: 이름
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordCheck, setShowPasswordCheck] = useState(false);

    const { register, handleSubmit, formState: { errors }, trigger, getValues, watch } = useForm<FormFields>({
        defaultValues: {
            name: "",
            email: "",
            password: "",
            passwordCheck: ""
        },
        resolver: zodResolver(schema),
        mode: "onChange",
    });

    // 현재 스텝의 필드들을 watch
    const email = watch("email");
    const password = watch("password");
    const passwordCheck = watch("passwordCheck");
    const name = watch("name");

    const onSubmit = async (data: FormFields) => {
        const { passwordCheck, ...rest } = data;
        try {
            const response = await postSignup(rest);
            console.log(response);
            navigate('/login');
        } catch (error) {
            console.error(error);
        }
    };

    const handleNext = async () => {
        let isValid = false;

        if (step === 1) {
            isValid = await trigger("email");
            if (isValid) setStep(2);
        } else if (step === 2) {
            isValid = await trigger(["password", "passwordCheck"]);
            if (isValid) setStep(3);
        }
    };

    const handleBack = () => {
        if (step > 1) setStep(step - 1);
    };

    // 각 스텝별 다음 버튼 활성화 조건
    const isNextDisabled = () => {
        if (step === 1) {
            return !email || !!errors.email;
        } else if (step === 2) {
            return !password || !passwordCheck || !!errors.password || !!errors.passwordCheck;
        }
        return false;
    };

    const isSubmitDisabled = !name || !!errors.name;

    return (
        <div className="flex flex-col items-center justify-center h-full gap-4">
            <div className="flex flex-row items-center w-80 px-4 py-2">
                <div 
                    onClick={() => step === 1 ? navigate('/') : handleBack()}
                    className="text-xl cursor-pointer hover:text-pink-500 transition-colors"
                >
                    &lt;
                </div>
                <div className="flex-1 text-center text-lg font-semibold">회원가입</div>
            </div>

            <div className="flex flex-col gap-3 w-[300px]">
                {/* 이전 단계 정보 표시 */}
                {step > 1 && (
                    <div className="text-sm text-gray-600 pb-2">
                        <div>이메일: {getValues("email")}</div>
                    </div>
                )}
                {step > 2 && (
                    <div className="text-sm text-gray-600 pb-2">
                        <div>비밀번호: {getValues("password")}</div>
                    </div>
                )}

                {/* Step 1: 이메일 */}
                {step === 1 && (
                    <>
                        <input
                            {...register("email")}
                            className={`border w-full p-[10px] focus:border-[#807bff] rounded-sm outline-none
                            ${errors?.email ? "border-red-500 bg-red-50" : "border-gray-300"}`}
                            type="email"
                            placeholder="이메일"
                        />
                        {errors.email && (
                            <div className="text-red-500 text-sm">{errors.email.message}</div>
                        )}
                        <button
                            type="button"
                            onClick={handleNext}
                            disabled={isNextDisabled()}
                            className="w-full bg-blue-600 text-white py-3 rounded-md text-lg font-medium hover:bg-blue-700 transition-colors cursor-pointer disabled:bg-gray-300 disabled:cursor-not-allowed"
                        >
                            다음
                        </button>
                    </>
                )}

                {/* Step 2: 비밀번호 */}
                {step === 2 && (
                    <>
                        <div className="relative">
                            <input
                                {...register("password")}
                                className={`border w-full p-[10px] pr-12 focus:border-[#807bff] rounded-sm outline-none
                                ${errors?.password ? "border-red-500 bg-red-50" : "border-gray-300"}`}
                                type={showPassword ? "text" : "password"}
                                placeholder="비밀번호"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                        {errors.password && (
                            <div className="text-red-500 text-sm">{errors.password.message}</div>
                        )}

                        <div className="relative">
                            <input
                                {...register("passwordCheck")}
                                className={`border w-full p-[10px] pr-12 focus:border-[#807bff] rounded-sm outline-none
                                ${errors?.passwordCheck ? "border-red-500 bg-red-50" : "border-gray-300"}`}
                                type={showPasswordCheck ? "text" : "password"}
                                placeholder="비밀번호 재확인"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPasswordCheck(!showPasswordCheck)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                            >
                                {showPasswordCheck ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                        {errors.passwordCheck && (
                            <div className="text-red-500 text-sm">{errors.passwordCheck.message}</div>
                        )}

                        <button
                            type="button"
                            onClick={handleNext}
                            disabled={isNextDisabled()}
                            className="w-full bg-blue-600 text-white py-3 rounded-md text-lg font-medium hover:bg-blue-700 transition-colors cursor-pointer disabled:bg-gray-300 disabled:cursor-not-allowed"
                        >
                            다음
                        </button>
                    </>
                )}

                {/* Step 3: 이름 */}
                {step === 3 && (
                    <>
                        <input
                            {...register("name")}
                            className={`border w-full p-[10px] focus:border-[#807bff] rounded-sm outline-none
                            ${errors?.name ? "border-red-500 bg-red-50" : "border-gray-300"}`}
                            type="text"
                            placeholder="이름"
                        />
                        {errors.name && (
                            <div className="text-red-500 text-sm">{errors.name.message}</div>
                        )}

                        <button
                            type="button"
                            onClick={handleSubmit(onSubmit)}
                            disabled={isSubmitDisabled}
                            className="w-full bg-blue-600 text-white py-3 rounded-md text-lg font-medium hover:bg-blue-700 transition-colors cursor-pointer disabled:bg-gray-300 disabled:cursor-not-allowed"
                        >
                            회원가입
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default SignupPage;