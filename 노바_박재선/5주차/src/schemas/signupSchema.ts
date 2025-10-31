import {z} from "zod";

export const signupSchema = z.object({
    email: z.string().email("올바른 이메일 형식을 입력해주세요"),
    password: z.string().min(6, "비밀번호는 최소 6자 이상이어야 합니다."),
    confirmPwd: z.string(),
    nickname: z.string().min(2, "닉네임은 두글자 이상이어야합니다."),
}).refine((data)=> data.password === data.confirmPwd, {
    message: "비밀번호가 일치하지 않습니다",
    path: ["confirmPwd"],
});

export type SignupForm = z.infer<typeof signupSchema>;