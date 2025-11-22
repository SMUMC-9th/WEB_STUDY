import type { CursorBasedResponse } from "../types/common";
import { axiosInstance } from "./axios";

// 댓글 목록 조회 - 커서 기반
export const getComments = async ({
  lpId,
  cursor = 0,
  order = "desc",
}: {
  lpId: string;
  cursor?: number;
  order?: "asc" | "desc"; // 정렬순서 (asc = 오래된 순 / desc = 최신 순)
}): Promise<CursorBasedResponse<Comment[]>> => {
  const { data } = await axiosInstance.get(`/v1/lps/${lpId}/comments`, {
    params: {
      cursor,
      order,
    },
  });
  return data;
};

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

  return data;
};

// 댓글 삭제 API 함수
export const deleteComment = async ({
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
