import type { CommonResponse, CursorBasedResponse } from "./common.ts";

export type Tag = {
  id: number;
  name: string;
};

export type Likes = {
  id: number;
  userId: number;
  lpId: number;
};

export type Lp = {
  id: number;
  title: string;
  content: string;
  thumbnail: string;
  published: boolean;
  authorId: number;
  createdAt: Date;
  updatedAt: Date;
  tags: Tag[];
  likes: Likes[];
};

export type ResponseLpDto = CommonResponse<Lp>; // ?? 원래 <Lp[]> 였는데 바꿈

export type RequestLpDto = {
  lpId: number;
};

export type ResponseLpListDto = CursorBasedResponse<Lp>;

export type ResponseLikeLpDto = CommonResponse<{
  id: number;
  userId: number;
  lpId: number;
}>;
