import type { CommonResponse } from "./common.ts";
//
// export type ResponseTagView = CommonResponse<{
//   data: [
//     {
//       id: 4;
//       name: "매튜";
//     },
//   ];
//   nextCursor: 5;
//   hasNext: false;
// }>;

export type ResponseTagView = CommonResponse<{
  data: {
    id: number;
    name: string;
  }[];
  nextCursor: number | null;
  hasNext: boolean;
}>;
