import type { PAGINATION_ORDER } from "../enums/common";
import type { Author } from "./lp";

export type CommonResponse<T> = {
  status: boolean;
  statusCode: number;
  message: string;
  data: T;
};

export type CursorBasedResponse<T> = CommonResponse<{
  data: T;
  nextCursor: number | null;
  hasNext: boolean;
}>;

export type PaginationDto = {
  cursor?: number;
  limit?: number;
  search?: string;
  order?: PAGINATION_ORDER;
};

export type Comment = {
  id: number;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  author: Author;
};

export type ResponseCommentListDto = CursorBasedResponse<Comment[]>;

//댓글 생성, 조회 응답 타입.
export type ResponseCommentDto = CommonResponse<Comment>;
