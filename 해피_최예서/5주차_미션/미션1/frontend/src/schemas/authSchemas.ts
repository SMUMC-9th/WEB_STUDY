// schemas/authSchemas.ts
import { z } from "zod";
import { emailSchema, passwordSchema, nameSchema } from "./commonSchemas";

export const signupSchema = z
  .object({
    email: emailSchema,
    password: passwordSchema,
    passwordCheck: passwordSchema,
    name: nameSchema,
  })
  .refine((data) => data.password === data.passwordCheck, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["passwordCheck"],
  });

export type SignupFormFields = z.infer<typeof signupSchema>;

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export type LoginFormFields = z.infer<typeof loginSchema>;
