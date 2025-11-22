import type { PaginationDto } from "../types/common";
import type { TDeleteLpResponse } from "../types/likes";
import type {
  RequestLpDto,
  ResponseLpListDto,
  ResponseLpDto,
  TPostLPDto,
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

// LP 삭제 요청
export const deleteLp = async ({
  lpId,
}: {
  lpId: number;
}): Promise<TDeleteLpResponse> => {
  const { data } = await axiosInstance.delete(`v1/lps/${lpId}`);
  return data;
};

// LP 새로 등록 (글쓰기)
export const postLP = async (payload: TPostLPDto) => {
  const { data } = await axiosInstance.post("/v1/lps", payload);
  return data;
};
