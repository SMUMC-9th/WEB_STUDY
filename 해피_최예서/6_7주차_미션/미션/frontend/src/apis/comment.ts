// todo: 댓글 목록 조회만 쿼리 만들고 연결해둠 (나머지는 get 요청이 아니니까 mutation으로 구현하기 -> 데이터 변경 끝나면 invalidateQueries로 조회 쿼리를 자동 새로고침?)

import { axiosInstance } from "./axios.ts";
import type {
  CommentListDto,
  RequestCommentAddDto,
  ResponseCommentAddDto,
  RequestCommentUpdateDto,
  ResponseCommentUpdateDto,
  DeleteCommentDto,
} from "../types/comment.ts";

// 댓글 목록 조회 get < get이니까 useQuery
export const getCommentList = async (lpId: number): Promise<CommentListDto> => {
  const { data } = await axiosInstance.get(`/v1/lps/${lpId}/comments`);
  return data;
};

// 댓글 생성 post
// axiosInstance.post(url, data)
// 첫 번째 인자: 요청을 보낼 API 경로
// 두 번째 인자: 요청시 실제로 서버로 보낼 데이터(BODY). POST/PUT/PATCH일 때만 사용
// 새 번째 인자 (선택): 옵션 객체 ex) headers, params,timeout etc...
export const postComment = async (
  lpId: number,
  body: RequestCommentAddDto
): Promise<ResponseCommentAddDto> => {
  const { data } = await axiosInstance.post(`/v1/lps/${lpId}/comments`, body); // body : 실제로 서버로 보낼 JSON 데이터
  return data;
};

// 댓글 수정
export const updateComment = async (
  lpId: number, // 어떤 LP의 댓글인지
  commentId: number, // 수정할 댓글의 ID
  body: RequestCommentUpdateDto // 수정할 내용
): Promise<ResponseCommentUpdateDto> => {
  const { data } = await axiosInstance.patch(`/v1/lps/${lpId}/comments/${commentId}`, body);
  return data;
};

// 댓글 삭제
export const deleteComment = async (
  lpId: number, // 어떤 LP의 댓글인지
  commentId: number
): Promise<DeleteCommentDto> => {
  const { data } = await axiosInstance.delete(`/v1/lps/${lpId}/comments/${commentId}`);
  return data;
};
