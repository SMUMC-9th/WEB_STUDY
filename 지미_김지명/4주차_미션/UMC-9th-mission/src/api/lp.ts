import { PaginationDto } from "../types/common.ts";
import { axiosInstance } from "./axios.ts";
import { RequestCreateLpDto, RequestLpDto, ResponseCreateLpDto, ResponseLikeLpDto, ResponseLpDetailDto, ResponseLpListDto } from "../types/lp.ts";
import { data } from "react-router-dom";

export const getLpList = async (
  paginationDto: PaginationDto,
): Promise<ResponseLpListDto> => {
  const { data } = await axiosInstance.get("/v1/lps", {
    params: paginationDto,
  });

  return data;
};

export const getLpDetail = async (lpId: number): Promise<ResponseLpDetailDto> => {
  const { data } = await axiosInstance.get(`/v1/lps/${lpId}`);
  return data;
};

export const createLp = async (
  body: RequestCreateLpDto
): Promise<ResponseCreateLpDto> => {
  const { data } = await axiosInstance.post("/v1/lps", body);
  return data;
};

export const postLike = async({lpId}: RequestLpDto):Promise<ResponseLikeLpDto> => {
  const {data} = await axiosInstance.post(`/v1/lps/${lpId}/likes`);

  return data;
}

export const deleteLike = async({lpId}: RequestLpDto):Promise<ResponseLikeLpDto> => {
  const {data} = await axiosInstance.delete(`/v1/lps/${lpId}/likes`);

  return data;
}
