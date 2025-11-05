import type { PaginationDto } from "../types/common.ts";
import axios from "axios";
import { axiosInstance } from "./axios.ts";
import type {
  RequestLpDto,
  ResponseLikeLpDto,
  ResponseLpListDto,
  RequestAddLpDto,
  ResponseAddLpDto,
  ResponseAuthAddImage,
  ResponseUnAuthAddImage,
} from "../types/lp.ts";
import type { ResponseTagView } from "../types/tags.ts";

// lp 목록 조회
export const getLpList = async (
  paginationDto: PaginationDto,
): Promise<ResponseLpListDto> => {
  const { data } = await axiosInstance.get("/v1/lps", {
    params: paginationDto,
  });

  return data;
};

// lp 생성
// ?? 맞나
export const postLp = async (
  body: RequestAddLpDto,
): Promise<ResponseAddLpDto> => {
  const { data } = await axiosInstance.post("/v1/lps", body);
  return data;
};

// lp 상세 조회
export const getLpDetail = async ({
  lpId,
}: RequestLpDto): Promise<ResponseLpListDto> => {
  const { data } = await axiosInstance.get(`/v1/lps/${lpId}`);

  return data;
};

// 좋아요
export const postLike = async ({
  lpId,
}: RequestLpDto): Promise<ResponseLikeLpDto> => {
  const { data } = await axiosInstance.post(`/v1/lps/${lpId}/likes`);
  return data;
};

export const deleteLike = async ({
  lpId,
}: RequestLpDto): Promise<ResponseLikeLpDto> => {
  const { data } = await axiosInstance.delete(`/v1/lps/${lpId}/likes`);
  return data;
};

// 태그 목록 조회 API
export const getTags = async (): Promise<ResponseTagView> => {
  const { data } = await axiosInstance.get("/v1/tags");
  return data;
};

// 이미지 업로드 (인증)
export const postAuthImage = async (
  formData: FormData,
): Promise<ResponseAuthAddImage> => {
  const { data } = await axiosInstance.post("/v1/uploads", formData, {
    headers: {
      "Content-Type": "multipart/form-data", // 파일업로드요청 -> multipart 헤더는 axiosInstance에서 자동으로 안 붙여지니까 직접 써줘야 함.
    },
  });
  return data;
};

// 이미지 업로드 (비인증 -> axios)
export const postUnAuthImage = async (
  formData: FormData,
): Promise<ResponseUnAuthAddImage> => {
  const { data } = await axios.post(
    `${import.meta.env.VITE_SERVER_API_URL}/v1/uploads/public`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );
  return data;
};
