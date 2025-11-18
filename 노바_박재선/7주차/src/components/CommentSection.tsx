import React, { useEffect, useState } from "react";
import { PAGINATION_ORDER } from "../enums/common";
import useGetInfiniteLpComments from "../hooks/queries/useGetInfiniteLpComments";
import { useInView } from "react-intersection-observer";
import useCreateLpComment from "../hooks/useCreateLpComments";
import CommentItem from "./CommentItem";
import useThrottle from "../hooks/useThrottle";

interface CommentSectionProps {
  lpid: string;
}

const CommentSection = ({ lpid }: CommentSectionProps) => {
  const [order, setOrder] = useState<PAGINATION_ORDER>(PAGINATION_ORDER.desc);
  const [commentText, setCommentText] = useState("");

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending,
    isError,
  } = useGetInfiniteLpComments(lpid, order);

  const { mutate: createComment, isPending: isCreatingComment } =
    useCreateLpComment();
  const { ref, inView } = useInView({ threshold: 0.5, delay: 100 });

  const throttledInView = useThrottle(inView, 1000);

  useEffect(() => {
    if (throttledInView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [throttledInView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const handleSubmitComment = () => {
    if (commentText.trim().length === 0) {
      alert("댓글을 입력하시오");
      return;
    }
    createComment(
      { lpid, content: commentText, order: order },
      { onSettled: () => setCommentText("") }
    );
  };

  const activeStyle =
    "text-white font-semibold border-b-2 border-white pb-1 cursor-pointer transition";
  const inactiveStyle =
    "text-gray-400 hover:text-white cursor-pointer transition";

  return (
    <div className="mt-12 pt-8 border-t border-neutral-700">
      {/* 댓글타이틀 + 정렬 버튼 */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">댓글</h2>
        <div className="flex space-x-4">
          <button
            className={
              order === PAGINATION_ORDER.asc ? activeStyle : inactiveStyle
            }
            onClick={() => setOrder(PAGINATION_ORDER.asc)}
          >
            오래된순
          </button>
          <button
            className={
              order === PAGINATION_ORDER.desc ? activeStyle : inactiveStyle
            }
            onClick={() => setOrder(PAGINATION_ORDER.desc)}
          >
            최신순
          </button>
        </div>
      </div>

      {/* 댓글작성 폼UI */}
      <div className="flex gap-4 mb-8">
        <input
          placeholder="댓글을 입력해주세요"
          value={commentText}
          type="text"
          onChange={(e) => setCommentText(e.target.value)}
          disabled={isCreatingComment}
          className="flex-1 p-3 bg-neutral-700 rounded-md text-white placeholder-gray-400"
        />
        <button
          onClick={handleSubmitComment}
          disabled={isCreatingComment}
          className="bg-neutral-600 text-white px-6 py-3 rounded-md hover:bg-pink-500  cursor-pointer tranisition hover:text-black transition"
        >
          {isCreatingComment ? "작성중입니다" : "작성"}
        </button>
      </div>

      {/* 댓글 목록 */}
      <div className="space-y-6">
        {isPending ? (
          <div className="text-center text-gray-500">Loading..</div>
        ) : isError ? (
          <div className="text-center text-red-600">Error..</div>
        ) : (
          data?.pages.map((page, i) => (
            <React.Fragment key={i}>
              {page.data.data.map((comment) => (
                <CommentItem
                  key={comment.id}
                  lpid={lpid}
                  comment={comment}
                  order={order}
                />
              ))}
            </React.Fragment>
          ))
        )}

        {/* 무한 스크롤 트리거 */}
        <div ref={ref} className="h-10">
          {isFetchingNextPage && hasNextPage && "더 많은 댓글 로딩중.."}
        </div>
      </div>
    </div>
  );
};

export default CommentSection;
