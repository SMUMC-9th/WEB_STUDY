// 스웨거에서 받을 때 공통 응답 타입
// data: T는 제네릭 타입으로, 다양한 데이터 타입을 받을 수 있도록 함

import type { PaginationOrder } from "../enums/common";

export type CommonResponse<T> = {
  status: boolean;
  statusCode: number;
  message: string;
  data: T;
};

// common으로 오는 data안에 data가 있으므로 이렇게 적어줘야 한다.
export type CursorBasedResponse<T> = CommonResponse<{
  data: T;
  nextCursor: number | null;
  hasNext: boolean;
}>;

export type PaginationDto = {
  cursor?: number;
  limit?: number;
  search?: string;
  order?: PaginationOrder;
};
