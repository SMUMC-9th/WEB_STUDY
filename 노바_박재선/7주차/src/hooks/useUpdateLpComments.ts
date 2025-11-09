import {
  type InfiniteData,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type { PAGINATION_ORDER } from "../enums/common";
import { updateLpComment } from "../apis/comment";
import { QUERY_KEY } from "../constants/key";
import { type Comment, type ResponseCommentListDto } from "../types/common";

interface updateLpCommentVariables {
  lpid: string;
  commentId: number;
  content: string;
  order: PAGINATION_ORDER;
}

const useUpdateComments = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ lpid, commentId, content }: updateLpCommentVariables) =>
      updateLpComment(lpid, commentId, content),

    onMutate: async ({ lpid, commentId, content, order }) => {
      const queryKey = [QUERY_KEY.lpComments, lpid, order];
      //충돌방지. 만약에 useGetInfiniteLpComments가 서버로부터 데이터를 새로고침(refetch)하고 있다면, 그작업 취소시킴
      //reason: 우리가 캐시를 수동으로 덮어쓸건데, 옛날 데이터 받아와서덮어쓰면 그사이에 바뀐정보는 저장이 안되기때문!!
      await queryClient.cancelQueries({ queryKey });
      //스냅샷 저장. 캐시 덮어쓰기전에 현재 저장된 원본 데이터(수정 전 데이터)의 스냅샷을 previousComments 변수에 저장하느거인
      //reason: 나중에 롤백 위해서
      const previousComments =
        queryClient.getQueriesData<InfiniteData<ResponseCommentListDto>>(
          queryKey
        );
      //여기는 캐시가 비어있는지 확인
      if (previousComments) {
        //useInfiniteQuery 캐시가 pages(페이지 배열)로 이루어져있어서 pages.map으로 모든 페이지를 순회한다
        const updatedPages = previousComments.pages.map((page) => ({
          ...page,
          data: {
            ...page.data,
            //각 페이지(page)안에 있는 실제 댓글 배열(page.data.data)를 다시 map으로 순회함.
            data: page.data.data.map((comment: Comment) =>
              //===조건 이용해서 수정하려는 댓글 하나만 찾는다
              comment.id === commentId
                ? //찾았다면, 그 댓글 객체를 복사(...comment)하고, content키의 값만 LpDatailPage에서 새로 입력받은 content로 덮어씀
                  { ...comment, content: content } //해당 commentId댓글의 content만 변경
                : //그리고, 해당 Id가 아닌 나머지들은 다 그대로 반환해줌.
                  comment
            ),
          },
        }));
        //화면 즉시 변경. queryClient.setQueryData는 Tanstack Query의 캐시를 강제로 덮어쓰는 함수임.
        queryClient.setQueryData<InfiniteData<ResponseCommentListDto>>(
          //queryKey 주소에, 방금 updatePages로 만들어놓은 새로운 가짜 데이터를 덮어쓴다.
          //그리고 이 함수가 실행되면 바로 이 queryKey를 구독(useQuery)하고 있던 LpDetailPage 컴포넌트가 리랜더링하면서, 사용자는 서버 응답과는 상관없이 수정한 댓글 내용을 화면에서 보게된다!!
          queryKey,
          {
            ...previousComments,
            pages: updatedPages,
          }
        );
      }
      //onError나 onSettled에서 롤백 할 수 있도록, 아까 저장한 원본 스냅샷 (previousComments)을 context 객체로 반환해줌.
      return { previousComments, queryKey };
    },

    //onError는 mutationFn(서버 API 호출)이 실패(Error)했을 때 실행된다.
    //롤백해야되기때문에 context넘겨줌

    onError: (error, variables, context) => {
      //롤백. 먼저 onMutate에서 반환한 context 객체에 previousComments(원본 스냅샷)가 있는지 확인.
      if (context?.previousComments) {
        //만약에 있으면 setQueryData를 사용해서 캐시 데이터를 조작하기 전의 원본 스냅샷으로 되돌린다.
        //그러면 인제 사용자 화면에서 수정 전의 댓글 내용이 다시 보인다.
        queryClient.setQueryData(context.queryKey, context.previousComments);
      }
      //수정 실패했을떄 알림보냄
      console.log("댓글 수정 실패:", error);
      alert("댓글 수정에 실패했습니다.");
    },

    //onSettled는 mutationFn이 성공하든 실패하든 상관없이 작업이 완료되면 무조건 마지막에 실행되는 함수
    onSettled: (data, error, variables) => {
      //서버와 동기화. invalidateQueries는 이 queryKey에 해당하는 캐시는 이제 더럽다(stale)라고 선언하는 함수임.
      //reason: onMutate로 캐시를 수정했지만, 그건 가짜 데이터임.(임시ID, 임시날짜...)
      //onSettled가 실행될때쯤에는 서버의 진짜 응답이 오니까, 이제 진짜 데이터로 캐시를 refetch(새로고침)해달라고 Tanstack Query한테 알려주는것임.
      //그래서, onError가 실행돼서 롤백 되더라도, onSettled는 여전히 실행되어서 서버에서 원본 데이터를 다시 가져와서 100% 일관성을 보장한다
      queryClient.invalidateQueries({
        //variables.lpid 만 사용해서 [QUERY_KEY.lpComments, lpid]키를 무효화하면, orefer가 asc던지 desc던지 상관없이 이 LP에 대한 모든 댓글 캐시를 새로고침한다
        queryKey: [QUERY_KEY.lpComments, variables.lpid],
      });
    },
  });
};

export default useUpdateComments;
