import { RequestCreateCommentDto, RequestUpdateCommentDto, ResponseCommentListDto, ResponseCreateCommentDto, ResponseDeleteCommentDto, ResponseUpdateCommentDto } from "../types/comment";
import { PaginationDto } from "../types/common";
import { axiosInstance } from "./axios";

// 댓글 목록 조회
export const getCommentList = async (
    lpId: number,
    paginationDto: PaginationDto
  ): Promise<ResponseCommentListDto> => {
    const { data } = await axiosInstance.get(`/v1/lps/${lpId}/comments`, {
      params: paginationDto,
    });
    return data;
};

// 댓글 생성
export const createComment = async (
    lpId: number,
    body: RequestCreateCommentDto
  ): Promise<ResponseCreateCommentDto> => {
    const { data } = await axiosInstance.post(`/v1/lps/${lpId}/comments`, body);
    return data;
};

// 댓글 수정
export const updateComment = async (
    lpId: number,
    commentId: number,
    body: RequestUpdateCommentDto
  ): Promise<ResponseUpdateCommentDto> => {
    const { data } = await axiosInstance.patch(
      `/v1/lps/${lpId}/comments/${commentId}`,
      body
    );
    return data;
};
  
// 댓글 삭제
export const deleteComment = async (
    lpId: number,
    commentId: number
  ): Promise<ResponseDeleteCommentDto> => {
    const { data } = await axiosInstance.delete(
      `/v1/lps/${lpId}/comments/${commentId}`
    );
    return data;
};
