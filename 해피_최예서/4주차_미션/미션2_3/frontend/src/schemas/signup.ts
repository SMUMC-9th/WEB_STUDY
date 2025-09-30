//schemas/signup.ts
import {z} from "zod";

// 1) Zod로 스키마 만들기
export const signupSchema = z
  .object({
    // 이메일 형식
    email: z.string().email({message: "올바른 이메일 형식이 아닙니다."}),

    // 비밀번호 입력
    password: z
      .string()
      .min(8, {
        message: "비밀번호는 8자 이상이어야 합니다.",
      })
      .max(20, {
        message: "비밀번호는 20자 이하여야 합니다.",
      }),

    // 비밀번호 확인하기 위해 다시 치게
    passwordCheck: z
      .string()
      .min(8, {
        message: "비밀번호는 8자 이상이어야 합니다.",
      })
      .max(20, {
        message: "비밀번호는 20자 이하여야 합니다.",
      }),

    // name: 빈 문자열이면 안됨
    name: z.string().min(1, {
      message: "이름을 입력해주세요",
    }),
  })
  .refine((data) => data.password === data.passwordCheck, {
    // 반대로 적기
    // 비밀번호가 일치하지 않을 때
    message: "비밀번호가 일치하지 않습니다.",
    path: ["passwordCheck"],
  });

// 2) Zod로 TS 타입 뽑기
export type SignupFormFields = z.infer<typeof signupSchema>;
// z.infer: 스키마대로 타입스크립트 타입 만들라는 뜻
