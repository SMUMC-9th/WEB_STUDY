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
  email: string;
  bio: string | null;
  avatar: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type DefaultLp = {
  title: string;
  content: string;
  thumbnail: string;
  tags: Tag[];
  published: boolean;
};

export type LP = DefaultLp & {
  id: number;

  authorId: number;
  createdAt: Date;
  updatedAt: Date;
  likes: Likes[];
};

export type LpDetail = LP & {
  author: Author;
};

export type Image = {
  imageUrl: string;
};

export type ResponseLpListDto = CursorBasedResponse<LP[]>;

export type ResponseLpDetailDto = CommonResponse<LpDetail>;

export type ResponseImageUrlDto = CommonResponse<Image>;
