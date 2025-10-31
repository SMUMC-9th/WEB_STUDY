export type CommonResponse<T> = {
  // 공통 응답 구조(status, message, data)는 거의 모든 API가 같음 → 하나만 만들고 제네릭으로 data 타입만 바꾸면 됨
  status: boolean;
  statusCode: number;
  message: string;
  data: T; // 실제 데이터
};

// CommonResponse<T> 에서 T 자리에 responseSignupDto를 넣음 따라서 CommonResponse 타입은 사실상 아래 처럼 됨.
// {
//   status: boolean
//   statusCode: number
//   message: string
//   data: {
//     id: number
//     name: string
//     email: string
//     bio: string | null
//     avatar: string | null
//     createdAt: Date
//     updatedAt: Date
//   }
// }
// 즉 제네릭 T에 실제 데이터 구조를 넣어서 공통 응답 구조 안에 넣은 것
