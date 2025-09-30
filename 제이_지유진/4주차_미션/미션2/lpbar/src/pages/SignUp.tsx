import { ChevronLeft, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { signUp } from "../api/auth";

const signUpSchema = z
  .object({
    email: z.string().email("올바른 이메일 형식을 입력해주세요."),
    password: z.string().min(6, "비밀번호는 6자 이상이어야 합니다."),
    confirmPassword: z.string(),
    nickname: z.string().min(1, "닉네임을 입력해주세요."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "비밀번호가 일치하지 않습니다.",
  });

type SignUpFormData = z.infer<typeof signUpSchema>;

export default function SignUp() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [, setUserData] = useLocalStorage("user", {});

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    trigger,
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    mode: "onChange",
  });

  const values = watch();
  const passwordValue = watch("password");
  const confirmValue = watch("confirmPassword");
  const passwordsMatch = confirmValue === passwordValue;

  const DEFAULT_PROFILE_IMAGE =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKPelunvobTdrAM_XNl7ME6ThiVkk0yhSHyQ&s";
  const [imagePreview, setImagePreview] = useState<string>(
    DEFAULT_PROFILE_IMAGE
  );

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNext = async () => {
    if (step === 1) {
      const valid = await trigger("email");
      if (valid) setStep(2);
    } else if (step === 2) {
      const valid = await trigger(["password", "confirmPassword"]);
      if (valid) setStep(3);
    }
  };

  const onSubmit = async (data: SignUpFormData) => {
    try {
      const res = await signUp({
        name: data.nickname,
        email: data.email,
        password: data.password,
        avatar: imagePreview,
        bio: `안녕하세요. 저는 ${data.nickname}입니다.`,
      });

      setUserData(res.data);
      navigate("/");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      alert("회원가입 실패");
    }
  };

  return (
    <div className="flex flex-col min-h-screen justify-center items-center text-white">
      <div className="w-full max-w-sm">
        <div className="relative flex items-center justify-center mb-6">
          <button
            onClick={() => (step === 1 ? navigate("/") : setStep(step - 1))}
            className="absolute left-0 p-2 rounded-full hover:bg-gray-800"
          >
            <ChevronLeft />
          </button>
          <h1 className="text-xl font-semibold">
            {step === 1 && "이메일 입력"}
            {step === 2 && "비밀번호 설정"}
            {step === 3 && "닉네임 설정"}
          </h1>
        </div>

        {step === 1 && (
          <div className="space-y-4">
            <input
              type="email"
              placeholder="이메일"
              {...register("email")}
              className="w-full px-4 py-3 rounded-xl bg-black/50 border border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
            <button
              onClick={handleNext}
              disabled={!values.email || !!errors.email}
              className={`w-full py-3 rounded-xl font-semibold shadow ${
                values.email && !errors.email
                  ? "bg-pink-500 hover:bg-pink-600"
                  : "bg-pink-500/50 cursor-not-allowed"
              }`}
            >
              다음
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <p className="text-sm text-gray-400 mb-2">이메일: {values.email}</p>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="비밀번호 (6자 이상)"
                {...register("password")}
                className="w-full px-4 py-3 pr-10 rounded-xl bg-black/50 border border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}

            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                placeholder="비밀번호 재확인"
                {...register("confirmPassword")}
                className="w-full px-4 py-3 pr-10 rounded-xl bg-black/50 border border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {confirmValue && !passwordsMatch && (
              <p className="text-red-500 text-sm">
                비밀번호가 일치하지 않습니다.
              </p>
            )}

            <button
              onClick={handleNext}
              disabled={
                !values.password ||
                !values.confirmPassword ||
                values.password !== values.confirmPassword ||
                !!errors.password ||
                !!errors.confirmPassword
              }
              className={`w-full py-3 rounded-xl font-semibold shadow ${
                values.password &&
                values.confirmPassword &&
                values.password === values.confirmPassword &&
                !errors.password &&
                !errors.confirmPassword
                  ? "bg-pink-500 hover:bg-pink-600"
                  : "bg-pink-500/50 cursor-not-allowed"
              }`}
            >
              다음
            </button>
          </div>
        )}

        {step === 3 && (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex flex-col items-center">
              <label
                htmlFor="profileImage"
                className="w-50 h-50 rounded-full bg-gray-700 flex items-center justify-center cursor-pointer overflow-hidden"
              >
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="프로필"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-gray-400 text-sm">이미지</span>
                )}
              </label>
              <input
                id="profileImage"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>
            <input
              type="text"
              placeholder="닉네임"
              {...register("nickname")}
              className="w-full px-4 py-3 rounded-xl bg-black/50 border border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            {errors.nickname && (
              <p className="text-red-500 text-sm">{errors.nickname.message}</p>
            )}
            <button
              type="submit"
              disabled={!values.nickname || !!errors.nickname}
              className={`w-full py-3 rounded-xl font-semibold shadow ${
                values.nickname && !errors.nickname
                  ? "bg-pink-500 hover:bg-pink-600"
                  : "bg-pink-500/50 cursor-not-allowed"
              }`}
            >
              회원가입 완료
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
