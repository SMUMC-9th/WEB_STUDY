// LP 관련 서버 통신 로직을 정의한 API 모듈

import type { PaginationDto } from "../types/common";
import type {
  RequestLpDto,
  ResponseLpListDto,
  ResponseLikeLpDto,
  TDeleteLpResponse,
  TPostLP,
  TPostLPResponse,
  ResponseLpDto,
} from "../types/lp";
import { axiosInstance } from "./axios";

// LP 목록 조회 (무한스크롤용)
export const getLPList = async (
  paginationDto: PaginationDto
): Promise<ResponseLpListDto> => {
  const { data } = await axiosInstance.get("v1/lps", {
    params: paginationDto,
  });

  return data;
};

//  LP 상세 조회 API
export const getLpDetail = async ({
  lpId,
}: RequestLpDto): Promise<ResponseLpDto> => {
  const { data } = await axiosInstance.get(`/v1/lps/${lpId}`);
  return data;
};

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

// LP 삭제 요청 (관리자/작성자만 가능)
export const deleteLp = async ({
  lpId,
}: {
  lpId: number;
}): Promise<TDeleteLpResponse> => {
  const { data } = await axiosInstance.delete(`v1/lps/${lpId}`);
  return data;
};

// LP 새로 등록 (글쓰기)
export const postLP = async ({
  title,
  content,
  thumbnail,
  tags,
  published,
}: TPostLP): Promise<TPostLPResponse> => {
  const { data } = await axiosInstance.post("v1/lps", {
    title,
    content,
    thumbnail,
    tags,
    published,
  });
  return data;
};
