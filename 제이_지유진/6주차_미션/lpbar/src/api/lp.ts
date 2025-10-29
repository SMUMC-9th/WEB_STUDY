import { axiosInstance } from "../api/axiosInstance"; // axios 세팅 필요
import type { TOrder } from "../constants/enum";
import type { TGetCommentResponse, TGetLPResponse } from "../types/lp";

type TGetParams = {
  order: TOrder;
  cursor: number;
  limit?: number;
};

type TGetCommentParams = TGetParams & {
  lpId: number;
};

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

export const fetchLPById = async (id: number) => {
  const res = await axiosInstance.get(`/v1/lps/${id}`);
  return res.data.data;
};

export const fetchCommentById = async (id: number) => {
  const res = await axiosInstance.get(`/v1/lps/${id}/comments`);
  return res.data.data;
};
