import type { CommonResponse, CursorBasedResponse } from "./common";

export type Tag = {
  id: number;
  name: string;
};

export type Likes = {
  id: number;
  userId: number;
  lpId: number;
};

export type Author = {
  id: number;
  name: string;
  avatarUrl?: string;
};

export type Lp = {
  id: number;
  title: string;
  content: string;
  thumbnail: string;
  published: boolean;
  authorId: number;
  author?: Author; // ✅ 추가
  createdAt: string;
  updatedAt: string;
  tags: Tag[];
  likes: Likes[];
};

export type RequestLpDto = {
  lpId: number;
};

export type ResponseLpDto = CommonResponse<Lp>;
export type ResponseLpListDto = CursorBasedResponse<Lp[]>;
export type ResponseLikeLpDto = CommonResponse<{
  id: number;
  userId: number;
  lpId: number;
}>;
export type TDeleteLpResponse = CommonResponse<{ data: boolean }>;

export type TPostLP = {
  title: string;
  content: string;
  tags: string[];
  thumbnail: string | null;
  published: boolean;
};

export type TPostLPResponse = CommonResponse<{
  data: Lp;
}>;
