import { CommonResponse, CursorBasedResponse } from "./common";

export type CommentAuthor = {
  id: number;
  name: string;
  email: string;
  bio: string | null;
  avatar: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type Comment = {
  id: number;
  content: string;
  lpId: number;
  authorId: number;
  createdAt: Date;
  updatedAt: Date;
  author: CommentAuthor;
};

// 댓글 목록 조회
export type ResponseCommentListDto = CursorBasedResponse<Comment[]>;

// 댓글 생성
export type RequestCreateCommentDto = {
  content: string;
};
export type ResponseCreateCommentDto = CommonResponse<Comment>;

// 댓글 수정
export type RequestUpdateCommentDto = {
  content: string;
};
export type ResponseUpdateCommentDto = CommonResponse<Comment>;

// 댓글 삭제
export type ResponseDeleteCommentDto = CommonResponse<{
  message: string;
}>;
