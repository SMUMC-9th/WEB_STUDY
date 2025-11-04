import type { CommonResponse } from "./common.ts";

// todo: 작동되나 확인해보기

// <댓글 목록 조회>
export type CommentListDto = CommonResponse<
  {
    id: number;
    content: string;
    lpId: number;
    authorId: number;
    createdAt: string;
    updatedAt: string;
    author: {
      id: number;
      name: string;
      email: string;
      bio: string | null;
      avatar: string | null;
      createdAt: string;
      updatedAt: string;
    };
  }[]
>;

// <댓글 생성>post

// 요청 타입
export type RequestCommentAddDto = {
  content: string; // 서버에 보낼 때 필요한 데이터
};

// 응답 타입
export type ResponseCommentAddDto = CommonResponse<{
  id: number;
  content: string;
  lpId: number;
  authorId: number;
  createdAt: string;
  updatedAt: string;
  author: {
    id: number;
    name: string;
    email: string;
    bio: string | null;
    avatar: string | null;
    createdAt: string;
    updatedAt: string;
  };
}>;

// <댓글 수정> patch
// 요청 타입
export type RequestCommentUpdateDto = {
  content: string;
};

// 응답 타입
export type ResponseCommentUpdateDto = CommonResponse<{
  id: number;
  content: string;
  lpId: number;
  authorId: number;
  createdAt: string;
  updatedAt: string;
  author: {
    id: number;
    name: string;
    email: string;
    bio: string | null;
    avatar: string | null;
    createdAt: string;
    updatedAt: string;
  };
}>;

// <댓글 삭제> delete

// 응답 타입만
export type DeleteCommentDto = CommonResponse<{
  message: string;
}>;
