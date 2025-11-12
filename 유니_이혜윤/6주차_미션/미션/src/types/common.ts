export type CommonResponse<T> = {
  status: boolean;
  statusCode: number;
  message: string;
  data: T;
};

export type CursorBasedResponse<T> = {
  status: boolean;
  statusCode: number;
  message: string;
  data: T;
};

export type PaginationDto = {
  cursor?: number;
  limit?: number;
  search?: string;
  order?: "asc" | "desc";
};

export type CommentDto = {
  lpId: number;
  cursor?: number;
  limit?: number;
  order?: "asc" | "desc";
};
