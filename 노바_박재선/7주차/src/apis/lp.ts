import { AwardIcon } from "lucide-react";
import type { PaginationDto } from "../types/common";
import type { ResponseLpDetailDto, ResponseLpListDto } from "../types/lp";
import { axiosInstance } from "./axios";

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

export const createLp = async (
  formData: FormData
): Promise<ResponseLpDetailDto> => {
  const { data } = await axiosInstance.post("v1/lps", formData);
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
  //이미 isLiked가 true면 이미 좋아요 누른거니까 취소
  //false면 좋아요를 새로누르는 거니까 post
  if (isLiked) {
    await axiosInstance.delete(`v1/lps/${lpid}/likes`);
  } else {
    await axiosInstance.post(`v1/lps/${lpid}/likes`);
  }
};

// export const toggleLpLikes = async (lpid: string, isLiked: boolean) => {
//   //이미 isLiked가 true면 이미 좋아요 누른거니까 취소
//   //false면 좋아요를 새로누르는 거니까 post
//   const method = isLiked ? "delete" : "post";
//   const { data } = await axiosInstance.request({url: `v1/lps/${lpid}/lies`, method});
//   return data;
// };
