import { type InfiniteData, useMutation, useQueryClient } from "@tanstack/react-query";
import { postLpComment } from "../apis/comment";
import { QUERY_KEY } from "../constants/key";
import { PAGINATION_ORDER } from "../enums/common";
import type { Comment, ResponseCommentListDto } from "../types/common";

interface CommentMutationVariables {
    lpid: string;
    content: string;
    order: PAGINATION_ORDER;
}

const useCreateLpComment = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({lpid, content}: CommentMutationVariables) => 
            postLpComment(lpid, content),
    

        onMutate: async ({lpid, content, order}) => {
            const queryKey = [QUERY_KEY.lpComments, lpid, order];

            //진행중인 리패치(refetch)를 취소함.
            await queryClient.cancelQueries({queryKey});
            //나중에 되돌리기 롤백 하기 위해서 현재 지금의 캐시 데이터의 스냅샷을 찍어둔다
            const previousComments = queryClient.getQueryData<InfiniteData<ResponseCommentListDto>>(queryKey);

            //new 댓글의 가짜 데이터를 만드는 과정
            const newComment: Comment = {
                id: Date.now(),  //얘는 임시 ID임.
                content: content,
                createdAt: new Date(),
                updatedAt: new Date(),
                author: { //서버가 반환할 작성자 정보 모르니까 임시로 만들어둠
                    id: 0,
                    name: "작성중임!!",
                    email: '', bio: null, avatar: null,
                    createdAt: new Date(), updatedAt: new Date()
                },
            };

            //캐시 데이터를 수동으로 바로 업데이트함.
            if(previousComments) {
                queryClient.setQueryData<InfiniteData<ResponseCommentListDto>>(queryKey, {
                    ...previousComments,
                    pages: previousComments.pages.map((page, index) => {
                        //최신순 정렬일때만 첫번째 페이지의 맨 위에 추가함
                        if(index === 0 && order === PAGINATION_ORDER.desc){
                            return {
                                ...page,
                                data: {
                                    ...page.data,
                                    data: [newComment, ...page.data.data as Comment[]],  //새 댓글을 배열 맨앞에다가 추가함.
                                },
                            };
                        }
                        return page;
                    }),
                });
            }
            //스냅샷 데이터를 context로 반환함(에러나면 롤백하려고)
            return {previousComments, queryKey}; 
        },

        onError: (error, variables, context)=> {
            //onMutate에서 반환한 스냅샷(previousComments)로 데이터를 되돌린다
            if (context?.previousComments){
                queryClient.setQueryData(context.queryKey, context.previousComments);
            }
            console.error("댓글 작성 실패: ",error);
            alert("댓글 작성에 실패했습니다. 다시 시도해주세요");
        },

        //mutation 성공이든 실패든 무조건 항상 실행되는것.
        onSettled: (data, error, variables) => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.lpComments, variables.lpid]
            })
        }
    })
}

export default useCreateLpComment;