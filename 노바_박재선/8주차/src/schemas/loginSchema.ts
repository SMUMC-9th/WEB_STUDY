import {z} from "zod";

export const loginSchema = z.object({
    email: z.string(). email("올바른 이메일 형식을 입력해주세요"),
    password: z.string().min(6, "비밀번호는 최소 6자 이상이어야 합니다."),
});

export type LoginForm = z.infer<typeof loginSchema>;