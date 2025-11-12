import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { createComment, updateComment, deleteComment } from "../../api/comment";
import { QUERY_KEY } from "../../constants/key";
import { PAGINATION_ORDER } from "../../enums/common";
import useGetInfiniteCommentList from "../../hooks/queries/useGetInfiniteCommentList";
import CommentList from "./CommentList";
import CommentInput from "./CommentInput";
import SortButtons from "./SortButtons";

interface CommentModalProps {
  isOpen: boolean;
  onClose: () => void;
  lpId: number;
  lpTitle: string;
}

const CommentModal = ({
  isOpen,
  onClose,
  lpId,
  lpTitle,
}: CommentModalProps) => {
  const [sortOrder, setSortOrder] = useState<PAGINATION_ORDER>(
    PAGINATION_ORDER.desc
  );
  const queryClient = useQueryClient();

  // 댓글 목록 조회 (무한 스크롤)
  const {
    data: comments,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isPending,
  } = useGetInfiniteCommentList(lpId, 10, sortOrder);

  const { ref: infiniteScrollRef } = useInView({
    threshold: 0,
    onChange: (inView) => {
      if (inView && hasNextPage && !isFetching) {
        fetchNextPage();
      }
    },
  });

  // 댓글 생성 뮤테이션
  const createCommentMutation = useMutation({
    mutationFn: (content: string) => createComment(lpId, { content }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.comments, lpId] });
    },
    onError: (error) => {
      console.error("댓글 생성 실패:", error);
      alert("댓글 작성에 실패했습니다.");
    },
  });

  // 댓글 수정 뮤테이션
  const updateCommentMutation = useMutation({
    mutationFn: ({
      commentId,
      content,
    }: {
      commentId: number;
      content: string;
    }) => updateComment(lpId, commentId, { content }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.comments, lpId] });
    },
    onError: (error) => {
      console.error("댓글 수정 실패:", error);
      alert("댓글 수정에 실패했습니다.");
    },
  });

  // 댓글 삭제 뮤테이션
  const deleteCommentMutation = useMutation({
    mutationFn: (commentId: number) => deleteComment(lpId, commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.comments, lpId] });
    },
    onError: (error) => {
      console.error("댓글 삭제 실패:", error);
      alert("댓글 삭제에 실패했습니다.");
    },
  });

  // 댓글 작성
  const handleSubmitComment = (content: string) => {
    createCommentMutation.mutate(content);
  };

  // 댓글 수정
  const handleEditComment = (commentId: number, content: string) => {
    updateCommentMutation.mutate({ commentId, content });
  };

  // 댓글 삭제
  const handleDeleteComment = (commentId: number) => {
    if (confirm("정말 삭제하시겠습니까?")) {
      deleteCommentMutation.mutate(commentId);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* 배경 오버레이 */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />

      {/* 모달 */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div
          className="bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* 헤더 */}
          <div className="p-6 border-b border-gray-700">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-2xl font-bold text-white">댓글</h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <p className="text-gray-400 text-sm">{lpTitle}</p>
          </div>

          {/* 정렬 버튼 */}
          <SortButtons sortOrder={sortOrder} onSortChange={setSortOrder} />

          {/* 댓글 목록 */}
          <div className="flex-1 overflow-y-auto p-6">
            {isPending ? (
              <div className="text-center text-gray-400 py-8">로딩 중...</div>
            ) : (
              <>
                {comments?.pages.map((page) => (
                  <CommentList
                    key={page.data.nextCursor}
                    comments={page.data.data}
                    onEdit={handleEditComment}
                    onDelete={handleDeleteComment}
                  />
                ))}

                <div
                  ref={infiniteScrollRef}
                  className="h-10 flex items-center justify-center"
                >
                  {isFetching && (
                    <div className="text-center text-gray-400 text-sm">
                      로딩 중...
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          {/* 댓글 입력 */}
          <CommentInput
            onSubmit={handleSubmitComment}
            isSubmitting={createCommentMutation.isPending}
          />
        </div>
      </div>
    </>
  );
};

export default CommentModal;
