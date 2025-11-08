import type { CommonResponse } from "./common";

export type ResponseLikeLpDto = CommonResponse<{
  id: number;
  userId: number;
  lpId: number;
}>;
export type TDeleteLpResponse = CommonResponse<{ data: boolean }>;
