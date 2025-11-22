// 스웨거에서 받을 때 공통 응답 타입
// data: T는 제네릭 타입으로, 다양한 데이터 타입을 받을 수 있도록 함

export type CommonResponse<T> = {
  status: boolean;
  statusCode: number;
  message: string;
  data: T;
};
