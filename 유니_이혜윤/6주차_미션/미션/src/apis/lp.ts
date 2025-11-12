import type { PaginationDto } from "../types/common";
import type {
  ResponseLpListDto,
  CommentListDto,
  RequestLpDto,
  LpDetailResponse,
  ResponseLikeLpDto,
  CreateLpRequest,
  CreateCommentRequest,
  DeleteCommentRequest,
} from "../types/lp";
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

export const getLpDetail = async ({
  lpId,
}: RequestLpDto): Promise<LpDetailResponse> => {
  const { data } = await axiosInstance.get(`/v1/lps/${lpId}`);
  return data;
};

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

export const createLp = async (body: CreateLpRequest) => {
  const { data } = await axiosInstance.post("/v1/lps", body);
  return data;
};

export const createLpComment = async ({
  lpId,
  body,
}: {
  lpId: number;
  body: CreateCommentRequest;
}) => {
  const { data } = await axiosInstance.post(`/v1/lps/${lpId}/comments`, body);
  return data;
};

export const updateLpComment = async ({
  lpId,
  commentId,
  body,
}: {
  lpId: number;
  commentId: number;
  body: CreateCommentRequest;
}) => {
  const { data } = await axiosInstance.patch(
    `/v1/lps/${lpId}/comments/${commentId}`,
    body
  );
  return data;
};

export const deleteLpComment = async ({
  lpId,
  commentId,
}: DeleteCommentRequest) => {
  const { data } = await axiosInstance.delete(
    `/v1/lps/${lpId}/comments/${commentId}`
  );
  return data;
};
