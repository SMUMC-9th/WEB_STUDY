import type { PaginationDto, ResponseCommentDto, ResPonseCommentListDto } from "../types/common";
import { axiosInstance } from "./axios";


// 해당 LP의 댓글 목록을 가져옴

export const getLpComments = async (
    lpid: string,
    {cursor, order, limit}: Omit<PaginationDto, 'search'>
): Promise<ResPonseCommentListDto> => {
    const {data}  = await axiosInstance.get(`/v1/lps/${lpid}/comments`, {
        params: {cursor, order, limit}
    });
    return data;
}

export const postLpComment = async (
    lpid: string,
    content: string,
): Promise<ResponseCommentDto> => {
    const {data} = await axiosInstance.post(`v1/lps/${lpid}/comments`,{
        content,
    });
    return data;
}