import type {
  PaginationDto,
  ResponseCommentDto,
  ResponseCommentListDto,
} from "../types/common";
import type { ResponseUserDto } from "../types/user";
import { axiosInstance } from "./axios";

// 해당 LP의 댓글 목록을 가져옴
export const getLpComments = async (
  lpid: string,
  { cursor, order, limit }: Omit<PaginationDto, "search">
): Promise<ResponseCommentListDto> => {
  const { data } = await axiosInstance.get(`/v1/lps/${lpid}/comments`, {
    params: { cursor, order, limit },
  });
  return data;
};

export const postLpComment = async (
  lpid: string,
  content: string
): Promise<ResponseCommentDto> => {
  const { data } = await axiosInstance.post(`/v1/lps/${lpid}/comments`, {
    content,
  });
  return data;
};

//patch : 수정
export const updateLpComment = async (
  lpid: string,
  commentId: number,
  content: string
): Promise<ResponseCommentDto> => {
  const { data } = await axiosInstance.patch(
    `/v1/lps/${lpid}/comments/${commentId}`,
    {
      content,
    }
  );
  return data;
};

//delete : 삭제
export const deleteLpComment = async (
  lpid: string,
  commentId: number
): Promise<void> => {
  await axiosInstance.delete(`v1/lps/${lpid}/comments/${commentId}`);
};

export const getMyInfo = async (): Promise<ResponseUserDto> => {
  const { data } = await axiosInstance.get(`/v1/users/me`);
  return data;
};

export const getUserInfo = async (id: number): Promise<ResponseUserDto> => {
  const { data } = await axiosInstance.get(`/v1/users/${id}`);
  return data;
};

//image mutationFn 적용 API요청
export const updateLpImage = async (
  imageUrl: string,
  lpid: string
): Promise<ResponseCommentDto> => {
  const { data } = await axiosInstance.patch(`/v1/lps/${lpid}`, {
    imageUrl,
  });
  return data;
};
