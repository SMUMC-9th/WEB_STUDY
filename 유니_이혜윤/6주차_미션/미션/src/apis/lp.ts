import type { PaginationDto } from "../types/common";
import type { ResponseLpListDto, CommentListDto } from "../types/lp";
import { axiosInstance } from "./axios";

export const getLpList = async (
  paginationDto: PaginationDto
): Promise<ResponseLpListDto> => {
  const { data } = await axiosInstance.get("/v1/lps", {
    params: paginationDto,
  });

  return data;
};

export const getLpComments = async ({
  lpId,
  cursor,
  limit,
  order,
}: {
  lpId: number;
  cursor?: number;
  limit?: number;
  order?: string;
}): Promise<CommentListDto> => {
  const { data } = await axiosInstance.get(`/v1/lps/${lpId}/comments`, {
    params: {
      cursor,
      limit,
      order,
    },
  });
  return data;
};
