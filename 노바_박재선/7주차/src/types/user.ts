import type { CommonResponse } from "./common";

export interface User {
  id: number;
  email: string;
  name: string;
  bio: string | null;
  avatar: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export type ResponseUserDto = CommonResponse<User>;
