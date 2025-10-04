import { z } from "zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { postSignup } from "../apis/auth";

const schema = z
  .object({
    email: z.string().email({ message: "올바른 이메일 형식이 아닙니다." }),
    password: z
      .string()
      .min(6, {
        message: "비밀번호는 6자 이상이어야 합니다.",
      })
      .max(12, { message: "비밀번호는 12자 이하여야 합니다." }),
    passwordCheck: z
      .string()
      .min(6, {
        message: "비밀번호는 6자 이상이어야 합니다.",
      })
      .max(12, { message: "비밀번호는 12자 이하여야 합니다." }),
    name: z.string().min(1, { message: "이름을 입력해주세요." }),
  })
  .refine((data) => data.password === data.passwordCheck, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["passwordCheck"],
  });

// 스키마에서 타입 자동 추론
type FormFields = z.infer<typeof schema>;

const SignupPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordCheck: "",
    },
    resolver: zodResolver(schema),
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordCheck, ...rest } = data;

    const response = await postSignup(rest);

    console.log(response);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full gap-4">
      <div className="flex flex-col gap-3">
        <input
          {...register("email")}
          name="email"
          type="email"
          className={`border border-[#ccc] w-[300px] p-2 rounded-sm
        ${
          errors?.email ? "border-red-400 bg-red-100" : "border-gray-300"
        } focus:border-[#888] focus:outline-none`}
          placeholder="email"
        />
        {errors.email && (
          <div className="text-red-400 text-xs">{errors.email.message}</div>
        )}

        <input
          {...register("password")}
          name="password"
          type="password"
          className={`border border-[#ccc] w-[300px] p-2 rounded-sm
        ${
          errors?.password ? "border-red-400 bg-red-100" : "border-gray-300"
        } focus:border-[#888] focus:outline-none`}
          placeholder="password"
        />
        {errors.password && (
          <div className="text-red-400 text-xs">{errors.password.message}</div>
        )}

        <input
          {...register("passwordCheck")}
          name="passwordCheck"
          type="password"
          className={`border border-[#ccc] w-[300px] p-2 rounded-sm
        ${
          errors?.passwordCheck
            ? "border-red-400 bg-red-100"
            : "border-gray-300"
        } focus:border-[#888] focus:outline-none`}
          placeholder="passwordCheck"
        />
        {errors.passwordCheck && (
          <div className="text-red-400 text-xs">
            {errors.passwordCheck.message}
          </div>
        )}

        <input
          {...register("name")}
          name="name"
          type="name"
          className={`border border-[#ccc] w-[300px] p-2 rounded-sm
        ${
          errors?.password ? "border-red-400 bg-red-100" : "border-gray-300"
        } focus:border-[#888] focus:outline-none`}
          placeholder="name"
        />
        {errors.name && (
          <div className="text-red-400 text-xs">{errors.name.message}</div>
        )}

        <button
          type="button"
          onClick={handleSubmit(onSubmit)}
          disabled={isSubmitting}
          className="bg-blue-100 text-white rounded-sm p-2 w-full cursor-pointer hover:bg-blue-200 transition-colors disabled:bg-gray-300 focus:outline-none"
        >
          signup
        </button>
      </div>
    </div>
  );
};

export default SignupPage;
