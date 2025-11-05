import { useParams } from "react-router-dom";
import useGetLpDetail from "../hooks/queries/useGetLpDetail.tsx";
import { Heart, Trash2, Pencil } from "lucide-react";
import { useAuth } from "../context/context.tsx";
import usePostLike from "../hooks/mutations/like/usePostLike.ts";
import useDeleteLike from "../hooks/mutations/like/useDeleteLike.ts";
import useGetMyInfo from "../hooks/queries/useGetMyInfo.ts";
import useGetCommentList from "../hooks/queries/useGetCommentList.ts";
import useDeleteComment from "../hooks/mutations/comment/useDeleteComment.ts";
import { useState } from "react";
// todo: 태그 고치기
// import { useGetTags } from "../hooks/queries/useGetTags.ts";
import usePostComment from "../hooks/mutations/comment/usePostComment.ts";
import useUpdateComment from "../hooks/mutations/comment/useUpdateComment.ts";

export default function LpDetailPage() {
  const { lpId } = useParams();
  const { accessToken, isLogin } = useAuth();

  // 댓글 수정
  const { mutate: updateCommentMutate } = useUpdateComment();
  const [newComment, setNewComment] = useState("");
  const [editCommentId, setEditCommentId] = useState<number | null>(null);
  const [editContent, setEditContent] = useState("");

  const handleEditClick = (commentId: number, content: string) => {
    setEditCommentId(commentId);
    setEditContent(content);
  };

  const handleUpdateComment = (commentId: number) => {
    if (!editContent.trim()) return alert("수정할 내용을 입력하세요.");
    updateCommentMutate({
      lpId: Number(lpId),
      commentId,
      body: { content: editContent },
    });
    setEditCommentId(null);
  };

  // 댓글 작성
  const { mutate: postCommentMutate } = usePostComment();
  const handleAddComment = () => {
    if (!newComment.trim()) return;

    postCommentMutate({
      lpId: Number(lpId),
      body: { content: newComment },
    });

    setNewComment("");
  };

  // 댓글 삭제
  const { mutate: deleteCommentMutate } = useDeleteComment();

  // 태그 쿼리 데이터 받아오기
  // const { data: tag } = useGetTags();

  // LP 상세, 유저 정보
  const {
    data: lp,
    isPending: lpLoading,
    isError: lpError,
  } = useGetLpDetail({ lpId: Number(lpId) });
  const { data: me } = useGetMyInfo(accessToken);

  // 좋아요 관련
  const { mutate: likeMutate } = usePostLike();
  const { mutate: dislikeMutate } = useDeleteLike();

  // 댓글 목록
  const {
    data: commentsData,
    isLoading: commentLoading,
    isError: commentError,
  } = useGetCommentList(Number(lpId));

  const isLiked =
    lp?.data?.likes?.map((like) => like.userId).includes(me?.data?.id ?? -1) ??
    false;

  const handleLikeLp = () => likeMutate({ lpId: Number(lpId) });
  const handleDislikeLP = () => dislikeMutate({ lpId: Number(lpId) });

  if (lpLoading) return <div className="mt-12">게시글 불러오는 중...</div>;
  if (lpError || !lp) return <div className="mt-12">게시글 불러오기 실패</div>;
  if (commentLoading) return <div className="mt-12">댓글 불러오는 중...</div>;
  if (commentError) return <div className="mt-12">댓글 불러오기 실패</div>;

  return (
    <div className="max-w-3xl mx-auto mt-12 px-4 py-6 bg-white rounded-lg shadow-md">
      {/* 제목 + 수정/삭제 버튼 */}
      <div className="flex items-center justify-between mb-4 border-b pb-2">
        <h1 className="text-2xl font-bold text-gray-800">{lp.data.title}</h1>
        <div className="flex items-center gap-2">
          <button className="p-2 text-gray-500 hover:text-blue-600 transition">
            <Pencil size={20} />
          </button>
          <button className="p-2 text-gray-500 hover:text-red-600 transition">
            <Trash2 size={20} />
          </button>
        </div>
      </div>
      {/* 썸네일 */}
      {lp.data.thumbnail && (
        <img
          src={lp.data.thumbnail}
          alt={lp.data.title}
          className="w-full h-64 object-cover rounded-md mb-6"
        />
      )}
      {/* 본문 */}
      <p className="text-gray-700 leading-relaxed whitespace-pre-wrap mb-6">
        {lp.data.content}
      </p>
      {/* 태그 렌더링 */}
      태그들어갈자리
      {/* 좋아요 버튼 */}
      <button
        onClick={isLiked ? handleDislikeLP : handleLikeLp}
        className="flex items-center gap-1 text-gray-600 hover:text-red-600 transition mb-6"
      >
        <Heart
          color={isLiked ? "red" : "gray"}
          fill={isLiked ? "red" : "transparent"}
        />
        <span className="text-sm">{lp.data.likes?.length ?? 0}</span>
      </button>
      {/* 댓글 섹션 */}
      <div className="border-t pt-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">댓글</h2>
        {/* 댓글 입력 */}
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
        {/* 댓글 목록 */}
        <div className="space-y-3">
          {commentsData?.data?.data?.length ? (
            commentsData.data.data.map((comment) => (
              <div
                key={comment.id}
                className="border border-gray-200 rounded-md p-3 flex justify-between items-start"
              >
                <div className="flex gap-3 w-full">
                  <img
                    src={comment.author.avatar}
                    alt="avatar"
                    className="w-10 h-10 rounded-full border"
                  />
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800">
                      {comment.author.name}
                    </p>

                    {/* 수정 중일 때는 textarea */}
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

                {/*댓글삭제 + 수정버튼*/}
                {/* 작성자 본인에게만 삭제 버튼 노출되게 */}
                {comment.author.id === me?.data?.id && (
                  <button
                    onClick={() =>
                      deleteCommentMutate({
                        lpId: Number(lpId),
                        commentId: comment.id,
                      })
                    }
                    className="text-gray-400 hover:text-red-500 transition ml-2"
                  >
                    🗑️
                  </button>
                )}

                {/* 작성자 본인에게만 수정 버튼 노출되게  */}
                {comment.author.id === me?.data?.id &&
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
    </div>
  );
}
