// [apis/comment.ts]
// LP 상세 페이지에서 특정 LP에 달린 댓글 목록을 가져오는 API 함수

import { axiosInstance } from "./axios";

// 댓글 목록 불러오기 (페이지네이션 + 정렬 방식 포함)
// apis/comment.ts
export const getComments = async ({
  lpId,
  page = 1,
  order = "desc",
}: {
  lpId: string; // LP ID (어떤 게시물의 댓글인지 지정)
  page?: number; // 페이지 번호 (무한스크롤 커서 역할, 기본값 1)
  order?: "asc" | "desc"; // 정렬순서 (asc = 오래된 순 / desc = 최신 순)
}) => {
  // 서버에 GET 요청을 보내고, query string으로 page와 order를 함께 전달함
  const { data } = await axiosInstance.get(`/v1/lps/${lpId}/comments`, {
    params: {
      page,
      order,
    },
  });
  return data;
};

// query string : 서버에 어떤 데이터를, 어떤 방식으로 가져오라고 요청하는 정보를 URL에 포함시킨 거
// ex. GET /v1/lps/1/comments?page=2&order=desc

// 댓글 작성 API 함수
export const postComment = async ({
  lpId,
  content,
}: {
  lpId: string;
  content: string;
}) => {
  const { data } = await axiosInstance.post(`/v1/lps/${lpId}/comments`, {
    content,
  });

  return data; // 서버 응답 데이터 반환
};

// 댓글 삭제 API 함수
export const deleteComment = async ({
  //lpId, commentId를 파라미터로 받아올거임
  lpId,
  commentId,
}: {
  lpId: number;
  commentId: number;
}) => {
  const { data } = await axiosInstance.delete(
    `/v1/lps/${lpId}/comments/${commentId}` // {}안에 링크로 보내는것 (스웨거에 request body가 required라고 나와있지 않으니까)
  );

  return data;
};

// 댓글 수정 API 함수
// apis/comment.ts
export const updateComment = async ({
  lpId,
  commentId,
  content,
}: {
  lpId: number;
  commentId: number;
  content: string;
}) => {
  const { data } = await axiosInstance.patch(
    `/v1/lps/${lpId}/comments/${commentId}`,
    { content }
  );
  return data;
};
