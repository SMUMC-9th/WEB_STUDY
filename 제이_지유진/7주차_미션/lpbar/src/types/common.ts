export type TCommonResponse<T> = {
  status: boolean;
  statuscode: number;
  message: string;
  data: T;
};
