import { axiosInstance } from "../api/axiosInstance"; // axios 세팅 필요
import type { TOrder } from "../constants/enum";
import type { TGetLPResponse } from "../types/lp";

type TGetLPParams = {
  order: TOrder;
  cursor: number;
  limit?: number;
};

export const getLP = async ({
  order,
  cursor,
  limit = 10,
}: TGetLPParams): Promise<TGetLPResponse> => {
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

export const fetchLPById = async (id: number) => {
  const res = await axiosInstance.get(`/v1/lps/${id}`);
  return res.data.data;
};
