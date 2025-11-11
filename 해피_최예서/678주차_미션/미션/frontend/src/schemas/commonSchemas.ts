// schemas/commonSchemas.ts
import { z } from "zod";

export const emailSchema = z
  .string()
  .email({ message: "올바른 이메일 형식이 아닙니다." });
export const passwordSchema = z
  .string()
  .min(8, { message: "비밀번호는 8자 이상이어야 합니다." })
  .max(20, { message: "비밀번호는 20자 이하여야 합니다." });
export const nameSchema = z.string().min(1, { message: "이름을 입력해주세요" });
