import type { CommonResponse } from "./common.ts";

// 댓글 작성자 정보 타입
export type CommentAuthor = {
  id: number;
  name: string;
  email: string;
  bio: string | null;
  avatar: string | null;
  createdAt: string;
  updatedAt: string;
};

// 댓글 타입
export type Comment = {
  id: number;
  content: string;
  lpId: number;
  authorId: number;
  createdAt: string;
  updatedAt: string;
  author: CommentAuthor;
};

// 댓글 목록 조회 응답 타입
export type CommentListDto = CommonResponse<{
  data: Comment[];
  nextCursor: number | null;
  hasNext: boolean;
}>;

// 댓글 생성
export type RequestCommentAddDto = {
  content: string;
};

export type ResponseCommentAddDto = CommonResponse<Comment>;

// 댓글 수정
export type RequestCommentUpdateDto = {
  content: string;
};

export type ResponseCommentUpdateDto = CommonResponse<Comment>;

// 댓글 삭제
export type DeleteCommentDto = CommonResponse<{
  message: string;
}>;
