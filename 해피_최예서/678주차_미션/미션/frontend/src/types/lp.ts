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

// LP 생성 요청 타입
export type RequestAddLpDto = {
  title: string;
  content: string;
  thumbnail: string;
  tags: string[]; // 태그 목록
  published: boolean;
};

// LP 생성 응답 타입
export type ResponseAddLpDto = CommonResponse<{
  id: number;
  title: string;
  content: string;
  thumbnail: string;
  published: boolean;
  authorId: number;
  createdAt: string;
  updatedAt: string;
}>;

// 이미지 업로드 (인증)
export type RequestAuthAddImage = {
  file: File; // file: string($binary)
  // 파일 객체로 다뤄야 하는듯..?
};
export type ResponseAuthAddImage = CommonResponse<{
  imageUrl: string;
}>;

// 이미지 업로드(비인증)
export type RequestUnAuthAddImage = {
  file: File;
};
export type ResponseUnAuthAddImage = CommonResponse<{
  imageUrl: string;
}>;

// LP 정보 업데이트
export type RequestUpdateLpDto = {
  title: string;
  content: string;
  thumbnail: string;
  tags: string[];
  published: boolean;
};

export type ResponseUpdateLpDto = CommonResponse<{
  id: number;
  title: string;
  content: string;
  thumbnail: string;
  published: boolean;
  authorId: number;
  createdAt: string;
  updatedAt: string;
  tags: {
    id: number;
    name: string;
  }[];
}>;

// LP 삭제
export type ResponseDeleteLpDto = CommonResponse<{}>;
