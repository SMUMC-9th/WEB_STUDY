import { axiosInstance } from "../api/axiosInstance"; // axios 세팅 필요
import type { TOrder } from "../constants/enum";
import type { CreateCommentPayload } from "../types/comment";
import type {
  CreateLPPayload,
  TGetCommentResponse,
  TGetLPResponse,
} from "../types/lp";

// 공통 GET 파라미터 타입 정의
type TGetParams = {
  order: TOrder;
  cursor: number;
  limit?: number;
};

// LP 댓글 조회용 파라미터 타입 정의 -> 이렇게 처음 해봄 제네릭으로 안 하면 이렇게 해야하는 것 같음
type TGetCommentParams = TGetParams & {
  lpId: number;
};

// get LP 목록 -> cursor 기반 페이징
export const getLP = async ({
  order,
  cursor,
  limit = 10,
}: TGetParams): Promise<TGetLPResponse> => {
  const res = await axiosInstance.get("/v1/lps", {
    params: { order, cursor, limit },
  });

  // 예시 응답 구조에 맞춰 반환
  return {
    data: {
      data: res.data.data.data,
      nextCursor: res.data.data.nextCursor,
      hasNext: res.data.data.hasNext,
    },
  };
};

// get LP 댓글 목록 -> cursor 기반 페이징
export const getComment = async ({
  order,
  cursor,
  limit = 1,
  lpId,
}: TGetCommentParams): Promise<TGetCommentResponse> => {
  const res = await axiosInstance.get(`/v1/lps/${lpId}/comments`, {
    params: { order, cursor, limit, lpId },
  });
  return {
    data: {
      data: res.data.data.data,
      nextCursor: res.data.data.nextCursor,
      hasNext: res.data.data.hasNext,
    },
  };
};

// LP 상세 조회
export const fetchLPById = async (id: number) => {
  const res = await axiosInstance.get(`/v1/lps/${id}`);
  console.log(res.data);
  return res.data.data;
};

// LP 댓글 상세 조회
export const fetchCommentById = async (id: number) => {
  const res = await axiosInstance.get(`/v1/lps/${id}/comments`);
  return res.data.data;
};

// LP 생성
export const createLp = async (payload: CreateLPPayload) => {
  const response = await axiosInstance.post("/v1/lps", payload);
  return response.data;
};

// 댓글 생성 -> LP ID 필요
export const createComment = async (payload: CreateCommentPayload) => {
  const response = await axiosInstance.post(
    `/v1/lps/${payload.lpId}/comments`,
    { content: payload.content }
  );
  return response.data;
};

// 이미지 업로드
export const uploadImage = async (formData: FormData) => {
  const response = await axiosInstance.post("/v1/uploads", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const modifyComment = async (
  updatedContent: string,
  lpId: number,
  commentId: number
) => {
  const res = await axiosInstance.patch(
    `/v1/lps/${lpId}/comments/${commentId}`,
    { content: updatedContent }
  );
  return res.data;
};

export const deleteComment = async (lpId: number, commentId: number) => {
  const res = await axiosInstance.delete(
    `/v1/lps/${lpId}/comments/${commentId}`
  );
  return res.data;
};

export const likeLP = async (lpId: number) => {
  const res = await axiosInstance.post(`/v1/lps/${lpId}/likes`);
  return res.data;
};

export const unlikeLP = async (lpId: number) => {
  const res = await axiosInstance.delete(`/v1/lps/${lpId}/likes`);
  return res.data;
};
