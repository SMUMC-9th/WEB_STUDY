import type { CursorBasedResponse } from "../types/common";
import type { ResponseLikeLpDto } from "../types/likes";
import type { Lp, RequestLpDto } from "../types/lp";
import { axiosInstance } from "./axios";

// LP에 좋아요 추가 요청
export const postLike = async ({
  lpId,
}: RequestLpDto): Promise<ResponseLikeLpDto> => {
  const { data } = await axiosInstance.post(`/v1/lps/${lpId}/likes`);

  return data;
};

//  LP 좋아요 삭제 요청
export const deleteLike = async ({
  lpId,
}: RequestLpDto): Promise<ResponseLikeLpDto> => {
  const { data } = await axiosInstance.delete(`/v1/lps/${lpId}/likes`);

  return data;
};

// 내가 좋아한 Lp 목록 조회
export const getMeLikes = async ({
  cursor = 0,
  limit = 10,
  search,
  order = "desc",
}: {
  cursor?: number;
  limit: number;
  search: string;
  order?: "asc" | "desc";
}): Promise<CursorBasedResponse<Lp[]>> => {
  const { data } = await axiosInstance.get(`/v1/lps/likes/me`, {
    params: {
      cursor,
      limit,
      search,
      order,
    },
  });

  return data;
};

// 특정 유저가 좋아한 Lp 목록 조회
export const getUsersLikes = async ({
  userId,
  cursor = 0,
  limit = 10,
  search,
  order = "desc",
}: {
  userId: string;
  cursor?: number;
  limit: number;
  search: string;
  order?: "asc" | "desc";
}): Promise<CursorBasedResponse<Lp[]>> => {
  const { data } = await axiosInstance.get(`/v1/lps/likes/${userId}`, {
    params: {
      cursor,
      limit,
      search,
      order,
    },
  });

  return data;
};
