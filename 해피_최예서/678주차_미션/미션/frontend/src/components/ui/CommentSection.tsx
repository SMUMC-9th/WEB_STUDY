import { useState } from "react";
import { Pencil } from "lucide-react";
import useGetCommentList from "../../hooks/queries/useGetCommentList.ts";
import useDeleteComment from "../../hooks/mutations/comment/useDeleteComment.ts";
import usePostComment from "../../hooks/mutations/comment/usePostComment.ts";
import useUpdateComment from "../../hooks/mutations/comment/useUpdateComment.ts";

interface CommentSectionProps {
  lpId: number;
  isLogin: boolean;
  myId?: number;
}

export default function CommentSection({
                                         lpId,
                                         isLogin,
                                         myId,
                                       }: CommentSectionProps) {
  const { mutate: updateCommentMutate } = useUpdateComment();
  const [newComment, setNewComment] = useState("");
  const [editCommentId, setEditCommentId] = useState<number | null>(null);
  const [editContent, setEditContent] = useState("");

  const { mutate: postCommentMutate } = usePostComment();
  const { mutate: deleteCommentMutate } = useDeleteComment();

  const {
    data: commentsData,
    isLoading: commentLoading,
    isError: commentError,
  } = useGetCommentList(lpId);

  const handleEditClick = (commentId: number, content: string) => {
    setEditCommentId(commentId);
    setEditContent(content);
  };

  const handleUpdateComment = (commentId: number) => {
    if (!editContent.trim()) return alert("수정할 내용을 입력하세요.");
    updateCommentMutate({
      lpId,
      commentId,
      body: { content: editContent },
    });
    setEditCommentId(null);
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    postCommentMutate({
      lpId,
      body: { content: newComment },
    });

    setNewComment("");
  };

  if (commentLoading) return <div className="mt-12">댓글 불러오는 중...</div>;
  if (commentError) return <div className="mt-12">댓글 불러오기 실패</div>;

  return (
    <div className="border-t pt-4">
      <h2 className="text-lg font-semibold text-gray-800 mb-3">댓글</h2>
      {isLogin ? (
        <div className="flex items-start gap-2 mb-4">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="댓글을 입력하세요..."
            className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-400"
          />
          <button
            onClick={handleAddComment}
            className="bg-[#3086d9] text-white px-4 py-2 rounded-md hover:bg-[#256bb3] transition"
          >
            등록
          </button>
        </div>
      ) : (
        <p className="text-sm text-gray-500 mb-4">
          로그인 후 댓글을 작성할 수 있습니다.
        </p>
      )}

      <div className="space-y-3">
        {commentsData?.data?.data?.length ? (
          commentsData.data.data.map((comment) => (
            <div
              key={comment.id}
              className="border border-gray-200 rounded-md p-3 flex justify-between items-start"
            >
              <div className="flex gap-3 w-full">
                <img
                  src={
                    comment.author.avatar ?? "/images/default-avatar.png"
                  }
                  alt="avatar"
                  className="w-10 h-10 rounded-full border object-cover"
                />
                <div className="flex-1">
                  <p className="font-semibold text-gray-800">
                    {comment.author.name}
                  </p>

                  {editCommentId === comment.id ? (
                    <>
                      <textarea
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        className="w-full border border-gray-300 rounded-md mt-2 px-2 py-1 focus:ring-1 focus:ring-[#3086d9]"
                      />
                      <div className="flex gap-2 mt-2">
                        <button
                          onClick={() => handleUpdateComment(comment.id)}
                          className="text-sm bg-[#3086d9] text-white px-3 py-1 rounded hover:bg-[#256bb3]"
                        >
                          수정 완료
                        </button>
                        <button
                          onClick={() => setEditCommentId(null)}
                          className="text-sm bg-gray-300 text-gray-700 px-3 py-1 rounded hover:bg-gray-400"
                        >
                          취소
                        </button>
                      </div>
                    </>
                  ) : (
                    <p className="text-gray-700 whitespace-pre-line mt-1">
                      {comment.content}
                    </p>
                  )}
                </div>
              </div>

              {comment.author.id === myId && (
                <button
                  onClick={() =>
                    deleteCommentMutate({
                      lpId: lpId,
                      commentId: comment.id,
                    })
                  }
                  className="text-gray-400 hover:text-red-500 transition ml-2"
                >
                  🗑️
                </button>
              )}

              {comment.author.id === myId &&
                editCommentId !== comment.id && (
                  <button
                    onClick={() =>
                      handleEditClick(comment.id, comment.content)
                    }
                    className="text-gray-400 hover:text-blue-500 transition ml-2"
                  >
                    <Pencil size={16} />
                  </button>
                )}
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm">아직 댓글이 없습니다.</p>
        )}
      </div>
    </div>
  );
}