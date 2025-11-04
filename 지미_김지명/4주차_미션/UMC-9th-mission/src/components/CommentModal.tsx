import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer"; // ✨ 추가
import { createComment, updateComment, deleteComment } from "../api/comment";
import { QUERY_KEY } from "../constants/key";
import { PAGINATION_ORDER } from "../enums/common";
import useGetInfiniteCommentList from "../hooks/queries/useGetInfiniteCommentList";
import type { Comment } from "../types/comment";

interface CommentModalProps {
  isOpen: boolean;
  onClose: () => void;
  lpId: number;
  lpTitle: string;
}

const CommentModal = ({ isOpen, onClose, lpId, lpTitle }: CommentModalProps) => {
  const [commentInput, setCommentInput] = useState("");
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editingContent, setEditingContent] = useState("");
  const [sortOrder, setSortOrder] = useState<PAGINATION_ORDER>(PAGINATION_ORDER.desc);

  const queryClient = useQueryClient();

  // 댓글 목록 조회 (무한 스크롤)
  const {
    data: comments,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isPending,
  } = useGetInfiniteCommentList(lpId, 10, sortOrder);

  const { ref: infiniteScrollRef, inView } = useInView({
    threshold: 0,
    onChange: (inView) => {
      if (inView && hasNextPage && !isFetching) {
        fetchNextPage();
      }
    },
  });

  // 댓글 생성 뮤테이션
  const createCommentMutation = useMutation({
    mutationFn: (content: string) =>
      createComment(lpId, { content }),
    onSuccess: () => {
      queryClient.invalidateQueries({ 
        queryKey: [QUERY_KEY.comments, lpId] 
      });
      setCommentInput("");
    },
    onError: (error) => {
      console.error("댓글 생성 실패:", error);
      alert("댓글 작성에 실패했습니다.");
    },
  });

  // 댓글 수정 뮤테이션
  const updateCommentMutation = useMutation({
    mutationFn: ({ commentId, content }: { commentId: number; content: string }) =>
      updateComment(lpId, commentId, { content }),
    onSuccess: () => {
      queryClient.invalidateQueries({ 
        queryKey: [QUERY_KEY.comments, lpId] 
      });
      setEditingCommentId(null);
      setEditingContent("");
    },
    onError: (error) => {
      console.error("댓글 수정 실패:", error);
      alert("댓글 수정에 실패했습니다.");
    },
  });

  // 댓글 삭제 뮤테이션
  const deleteCommentMutation = useMutation({
    mutationFn: (commentId: number) =>
      deleteComment(lpId, commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ 
        queryKey: [QUERY_KEY.comments, lpId] 
      });
    },
    onError: (error) => {
      console.error("댓글 삭제 실패:", error);
      alert("댓글 삭제에 실패했습니다.");
    },
  });

  // 댓글 작성
  const handleSubmitComment = () => {
    if (!commentInput.trim()) {
      alert("댓글을 입력해주세요.");
      return;
    }
    createCommentMutation.mutate(commentInput);
  };

  // 댓글 수정 시작
  const handleStartEdit = (comment: Comment) => {
    setEditingCommentId(comment.id);
    setEditingContent(comment.content);
  };

  // 댓글 수정 완료
  const handleFinishEdit = (commentId: number) => {
    if (!editingContent.trim()) {
      alert("댓글 내용을 입력해주세요.");
      return;
    }
    updateCommentMutation.mutate({ commentId, content: editingContent });
  };

  // 댓글 수정 취소
  const handleCancelEdit = () => {
    setEditingCommentId(null);
    setEditingContent("");
  };

  // 댓글 삭제
  const handleDeleteComment = (commentId: number) => {
    if (confirm("정말 삭제하시겠습니까?")) {
      deleteCommentMutation.mutate(commentId);
    }
  };

  // 정렬 변경
  const handleSortChange = (order: PAGINATION_ORDER) => {
    setSortOrder(order);
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
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <p className="text-gray-400 text-sm">{lpTitle}</p>
          </div>

          {/* 정렬 버튼 */}
          <div className="px-6 py-3 border-b border-gray-700 flex gap-2">
            <button
              onClick={() => handleSortChange(PAGINATION_ORDER.desc)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                sortOrder === PAGINATION_ORDER.desc
                  ? "bg-[#FF007F] text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              최신순
            </button>
            <button
              onClick={() => handleSortChange(PAGINATION_ORDER.asc)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                sortOrder === PAGINATION_ORDER.asc
                  ? "bg-[#FF007F] text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              오래된순
            </button>
          </div>

          {/* 댓글 목록 */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {isPending ? (
              <div className="text-center text-gray-400 py-8">로딩 중...</div>
            ) : (
              <>
                {comments?.pages.map((page) =>
                  page.data.data.map((comment) => (
                    <div key={comment.id} className="bg-gray-700 rounded-lg p-4">
                      {/* 작성자 정보 */}
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center">
                          {comment.author.avatar ? (
                            <img
                              src={comment.author.avatar}
                              alt={comment.author.name}
                              className="w-full h-full rounded-full object-cover"
                            />
                          ) : (
                            <span className="text-white text-lg">
                              {comment.author.name[0]}
                            </span>
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="text-white font-semibold">
                            {comment.author.name}
                          </p>
                          <p className="text-gray-400 text-xs">
                            {new Date(comment.createdAt).toLocaleString()}
                          </p>
                        </div>
                        
                        {/* 수정/삭제 버튼 */}
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleStartEdit(comment)}
                            className="text-gray-400 hover:text-white transition-colors"
                            title="수정"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => handleDeleteComment(comment.id)}
                            className="text-gray-400 hover:text-red-400 transition-colors"
                            title="삭제"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>

                      {/* 댓글 내용 */}
                      {editingCommentId === comment.id ? (
                        <div className="space-y-2">
                          <input
                            type="text"
                            value={editingContent}
                            onChange={(e) => setEditingContent(e.target.value)}
                            className="w-full px-3 py-2 bg-gray-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF007F]"
                            autoFocus
                          />
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleFinishEdit(comment.id)}
                              disabled={updateCommentMutation.isPending}
                              className="flex items-center gap-1 px-3 py-1 bg-[#FF007F] text-white rounded-md hover:bg-pink-600 transition-colors text-sm disabled:opacity-50"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            </button>
                            <button
                              onClick={handleCancelEdit}
                              className="px-3 py-1 bg-gray-600 text-white rounded-md hover:bg-gray-500 transition-colors text-sm"
                            >
                              취소
                            </button>
                          </div>
                        </div>
                      ) : (
                        <p className="text-white">{comment.content}</p>
                      )}
                    </div>
                  ))
                )}

                <div ref={infiniteScrollRef} className="h-10 flex items-center justify-center">
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
          <div className="p-6 border-t border-gray-700">
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="댓글을 입력해주세요"
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmitComment();
                  }
                }}
                className="flex-1 px-4 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF007F]"
              />
              <button
                onClick={handleSubmitComment}
                disabled={createCommentMutation.isPending}
                className="px-6 py-3 bg-[#FF007F] text-white rounded-lg hover:bg-pink-600 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                작성
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CommentModal;
