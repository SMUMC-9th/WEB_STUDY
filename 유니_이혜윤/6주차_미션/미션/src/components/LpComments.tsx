import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import type { CommentListDto, CLP, RequestLpDto } from "../types/lp";
import { OrderToggle } from "../components";
import useGetLpComments from "../hooks/useGetComments";
import usePostComment from "../hooks/mutations/usePostComment";
import useUpdateComment from "../hooks/mutations/useUpdateComment";
import useDeleteComment from "../hooks/mutations/useDeleteComment";
import { SquarePen, Trash } from "lucide-react";

export default function LpComments({ lpId }: RequestLpDto) {
  const [order, setOrder] = useState<"desc" | "asc">("desc");
  const [content, setContent] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editContent, setEditContent] = useState("");

  const { data, fetchNextPage, refetch, isFetching, hasNextPage } =
    useGetLpComments({ lpId, order });

  const { mutate: postComment, isPending: posting } = usePostComment(
    lpId,
    order
  );
  const { mutate: updateComment } = useUpdateComment(lpId, order);
  const { mutate: deleteComment } = useDeleteComment(lpId, order);

  // 무한스크롤
  const { ref, inView } = useInView({ threshold: 0 });
  useEffect(() => {
    if (inView && hasNextPage && !isFetching) fetchNextPage();
  }, [inView, fetchNextPage, isFetching, hasNextPage]);

  useEffect(() => {
    refetch();
  }, [order, refetch]);

  // 댓글 등록
  const handleSubmit = () => {
    const text = content.trim();
    if (!text) return;
    postComment({ content: text }, { onSuccess: () => setContent("") });
  };

  // 댓글 수정
  const handleUpdate = (commentId: number) => {
    if (!editContent.trim()) return;
    updateComment(
      { commentId, content: editContent },
      {
        onSuccess: () => {
          setEditingId(null);
          setEditContent("");
        },
      }
    );
  };

  // 댓글 삭제
  const handleDelete = (commentId: number) => {
    deleteComment({ commentId });
  };

  return (
    <>
      <div className="flex justify-end mb-2">
        <OrderToggle order={order} onChange={setOrder} />
      </div>

      {/* 댓글 입력 */}
      <div className="flex gap-2 mb-4">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full min-h-[60px] p-2 text-sm border border-gray-300 rounded-md outline-none resize-none"
          placeholder="댓글을 입력하세요"
          disabled={posting}
        />
        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            disabled={!content.trim() || posting}
            className="w-[60px] px-3 py-1.5 text-xs rounded bg-gray-500 text-white disabled:opacity-50 cursor-pointer"
          >
            등록
          </button>
        </div>
      </div>

      {/* 댓글 리스트 */}
      {data?.pages.map((comments: CommentListDto) =>
        comments.data.data.map((comment: CLP) => (
          <div
            key={comment.id}
            className="flex gap-3 mb-3 p-4 rounded-lg bg-white"
          >
            <img
              src={comment.author.avatar}
              alt={comment.author.name}
              className="w-10 h-10 rounded-full object-cover border border-gray-200"
            />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    {comment.author.name}
                  </p>
                  <p className="text-[11px] text-gray-400">
                    {new Date(comment.createdAt).toLocaleDateString("ko-KR", {
                      year: "2-digit",
                      month: "2-digit",
                      day: "2-digit",
                    })}
                  </p>
                </div>

                {/* 수정/삭제 */}
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setEditingId(comment.id);
                      setEditContent(comment.content);
                    }}
                  >
                    <SquarePen className="w-5 h-5 text-gray-500 cursor-pointer" />
                  </button>
                  <button onClick={() => handleDelete(comment.id)}>
                    <Trash className="w-5 h-5 text-gray-500 cursor-pointer" />
                  </button>
                </div>
              </div>

              {editingId === comment.id ? (
                <div className="mt-2">
                  <textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    className="w-full min-h-[60px] p-2 text-sm border border-gray-300 rounded-md outline-none resize-none"
                  />
                  <div className="flex justify-end gap-2 mt-1">
                    <button
                      onClick={() => handleUpdate(comment.id)}
                      disabled={!editContent.trim()}
                      className="text-xs bg-gray-400 text-white px-2 py-1 rounded disabled:opacity-50 cursor-pointer"
                    >
                      저장
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded cursor-pointer"
                    >
                      취소
                    </button>
                  </div>
                </div>
              ) : (
                <p className="mt-2 text-sm text-gray-700">{comment.content}</p>
              )}
            </div>
          </div>
        ))
      )}

      {/* 무한스크롤 */}
      <div className="w-full flex justify-center mt-5 min-h-6" ref={ref}>
        {hasNextPage && <span>로딩중...</span>}
      </div>
    </>
  );
}
