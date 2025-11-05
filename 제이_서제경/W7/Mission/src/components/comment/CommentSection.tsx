import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useState, type FormEvent, useMemo } from "react";
import { useAuth } from "../../context/AuthContext";
import CommentSkeletonList from "./CommentSkeletonList";
import { deleteComment, getComments, postComment } from "../../apis/comment";
import { PAGINATION_ORDER, type PaginationOrder } from "../../enums/common";
import { type Comment } from "../../../src/types/comment";

// 정렬 라벨 매핑
const ORDER_LABEL: Record<PaginationOrder, string> = {
  asc: "오래된 순",
  desc: "최신순",
};

function CommentSection({ lpId }: { lpId: string }) {
  const [order, setOrder] = useState<PaginationOrder>(PAGINATION_ORDER.DESC); // 기본: 최신순
  const [commentInput, setCommentInput] = useState("");

  const { user } = useAuth();
  const queryClient = useQueryClient();

  // 댓글 작성
  const { mutate: createComment, isPending: creating } = useMutation({
    mutationFn: (content: string) => postComment({ lpId, content }),
    onSuccess: () => {
      setCommentInput("");
      queryClient.invalidateQueries({ queryKey: ["comments", lpId, order] });
    },
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const content = commentInput.trim();
    if (!content) return;
    createComment(content);
  };

  // 댓글 삭제
  const { mutate: deleteCommentMutation, isPending: deleting } = useMutation({
    mutationFn: ({ commentId }: { commentId: number }) =>
      deleteComment({ lpId: Number(lpId), commentId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", lpId, order] });
    },
  });

  const handleDelete = (commentId: number) => {
    if (window.confirm("댓글을 삭제하시겠습니까?")) {
      deleteCommentMutation({ commentId });
    }
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isError,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["comments", lpId, order],
    queryFn: ({ pageParam = 0 }) =>
      getComments({ lpId, cursor: pageParam, order }),
    getNextPageParam: (lastPage) =>
      lastPage.data.hasNext ? lastPage.data.nextCursor : undefined,
    initialPageParam: 0,
    staleTime: 30 * 1000,
  });

  const flatComments: Comment[] = useMemo(
    () => data?.pages.flatMap((p) => p.data.data) ?? [],
    [data]
  );

  if (isLoading) return <CommentSkeletonList count={5} />;
  if (isError)
    return <p className="text-red-500">댓글을 불러오는 데 실패했습니다.</p>;

  return (
    <div className="mx-auto w-full max-w-2xl">
      {/* 정렬 버튼 */}
      <div className="mb-4">
        <div className="inline-flex rounded-full overflow-hidden border border-neutral-200 bg-white/70 backdrop-blur">
          {Object.values(PAGINATION_ORDER).map((value) => (
            <button
              key={value}
              onClick={() => setOrder(value)}
              className={[
                "w-[104px] py-2 text-sm font-medium transition-colors",
                order === value
                  ? "bg-neutral-900 text-white"
                  : "bg-white text-neutral-800 hover:bg-neutral-100",
              ].join(" ")}
            >
              {ORDER_LABEL[value]}
            </button>
          ))}
        </div>
      </div>

      {/* 댓글 목록 */}
      <div className="divide-y divide-neutral-200 bg-white/60 backdrop-blur rounded-lg border border-neutral-200">
        {flatComments.length === 0 && (
          <div className="p-4 text-sm text-neutral-500">댓글을 남겨보세요.</div>
        )}

        {flatComments.map((comment) => {
          const isAuthor = user?.id === comment.authorId;

          return (
            <div key={comment.id} className="relative p-4">
              {/* 내용 */}
              <p className="mb-1 text-[15px] text-neutral-900">
                {comment.content}
              </p>

              {/* 메타 */}
              <div className="text-xs text-neutral-500">
                {comment.author?.name ?? "익명"} ·{" "}
                {new Date(comment.createdAt).toLocaleString()}
              </div>

              {/* 내 댓글만 삭제 버튼 노출 */}
              {isAuthor && (
                <button
                  className="absolute top-3 right-3 rounded-md px-2 py-1 text-xs text-red-600 hover:bg-red-50"
                  onClick={() => handleDelete(comment.id)}
                  disabled={deleting}
                  title="댓글 삭제"
                >
                  삭제
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* 더보기*/}
      {hasNextPage && (
        <div className="flex justify-center">
          <button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="mt-4 h-10 px-4 rounded-full text-sm bg-white border border-neutral-200 hover:bg-neutral-50 disabled:opacity-50"
          >
            {isFetchingNextPage ? "불러오는 중..." : "댓글 더보기"}
          </button>
        </div>
      )}

      {/* 작성 폼 */}
      <form onSubmit={handleSubmit} className="mt-6 flex gap-2">
        <input
          value={commentInput}
          onChange={(e) => setCommentInput(e.target.value)}
          placeholder="댓글을 입력해주세요."
          className="flex-1 h-10 rounded-lg border border-neutral-300 bg-white px-3 text-sm outline-none focus:border-neutral-400 transition-colors"
        />
        <button
          type="submit"
          disabled={!commentInput.trim() || creating}
          className="h-10 px-4 rounded-lg text-sm font-medium bg-neutral-900 text-white hover:bg-neutral-800 disabled:opacity-50"
        >
          작성
        </button>
      </form>
    </div>
  );
}

export default CommentSection;
