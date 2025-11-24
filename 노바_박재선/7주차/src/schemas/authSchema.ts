import z from "zod";

export const emailSchema = z
  .string()
  .email("올바른 이메일 형식을 입력해주세요");

export const passwordSchema = z
  .string()
  .min(6, "비밀번호는 6자 이상이어야합니다");

export const nicknameSchema = z
  .string()
  .min(2, "닉네임은 두글자 이상이어야합니다");

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const signupSchema = z
  .object({
    email: emailSchema,
    password: passwordSchema,
    confirmPwd: z.string(),
    nickname: nicknameSchema,
  })
  .refine((data) => data.password === data.confirmPwd, {
    message: "비밀번호가 일치하지 않습니다",
    path: ["confirmPwd"],
  });

export type LoginForm = z.infer<typeof loginSchema>;
export type SignupForm = z.infer<typeof signupSchema>;
