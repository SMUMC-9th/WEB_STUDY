import type { PaginationDto } from "../types/common";
import type { ResponseLpDetailDto, ResponseLpListDto } from "../types/lp";
import { axiosInstance } from "./axios";

// 이미지 업로드: 파일을 서버에 업로드하고 URL을 반환
export const uploadImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);
  const { data } = await axiosInstance.post("/v1/uploads", formData);
  console.log("업로드 응답:", data); // 디버깅용
  const imageUrl = data.url || data.data?.url || data;
  console.log("반환되는 이미지 URL:", imageUrl); // 디버깅용
  return imageUrl;
};

export const getLpList = async (
  paginationDto: PaginationDto
): Promise<ResponseLpListDto> => {
  const { data } = await axiosInstance.get("/v1/lps", {
    params: paginationDto,
  });

  return data;
};

export const getLpDetail = async (
  lpid: string
): Promise<ResponseLpDetailDto> => {
  const { data } = await axiosInstance.get(`/v1/lps/${lpid}`);
  return data;
};

export const getMyLps = async (
  paginationDto: PaginationDto
): Promise<ResponseLpListDto> => {
  const { data } = await axiosInstance.get("v1/lps/user", {
    params: paginationDto,
  });
  return data;
};

export const createLp = async (lpData: {
  title: string;
  content: string;
  thumbnail: string;
  published: boolean;
  tags: string[];
}): Promise<ResponseLpDetailDto> => {
  const { data } = await axiosInstance.post("/v1/lps", lpData);
  return data;
};

export const updateLp = async (
  lpid: string,
  formData: FormData
): Promise<ResponseLpDetailDto> => {
  const { data } = await axiosInstance.patch(`v1/lps/${lpid}`, formData);
  return data;
};

export const toggleLpLikes = async (lpid: string, isLiked: boolean) => {
  if (isLiked) {
    return await axiosInstance.delete(`v1/lps/${lpid}/likes`);
  } else {
    return await axiosInstance.post(`v1/lps/${lpid}/likes`);
  }
};
