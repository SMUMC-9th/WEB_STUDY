import { PaginationDto } from "../types/common.ts";
import { axiosInstance } from "./axios.ts";
import { ResponseLpDetailDto, ResponseLpListDto } from "../types/lp.ts";

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