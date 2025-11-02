export type CommonResponse<T> = {
  // 공통 응답 구조(status, message, data)는 거의 모든 API가 같음 → 하나만 만들고 제네릭으로 data 타입만 바꾸면 됨
  status: boolean;
  statusCode: number;
  message: string;
  data: T; // 실제 데이터
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
  order?: "asc" | "desc";
};
