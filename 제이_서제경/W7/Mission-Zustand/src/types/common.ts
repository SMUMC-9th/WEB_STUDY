// 스웨거에서 받을 공통 응답 타입 정의함
import type { PaginationOrder } from "../enums/common";

// 공통 응답 타입
export type CommonResponse<T> = {
  status: boolean;
  statusCode: number;
  message: string;
  data: T;
};

// 커서 기반 페이지네이션 응답 타입
export type CursorBasedResponse<T> = CommonResponse<{
  data: T;
  nextCursor: number | null;
  hasNext: boolean;
}>;

// 페이지네이션 요청 DTO 타입
export type PaginationDto = {
  cursor?: number;
  limit?: number;
  search?: string;
  order?: PaginationOrder;
};
