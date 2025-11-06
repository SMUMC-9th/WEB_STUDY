import { useParams, useNavigate } from "react-router-dom";

import useGetLpDetail from "../hooks/queries/useGetLpDetail";
import { Heart } from "lucide-react";
import useGetMyInfo from "../hooks/queries/useGetInfo";
import { useAuth } from "../context/AuthContext";
import CommentModal from "../components/Comment/CommentModal";
import usePostLike from "../hooks/mutations/usePostLike";
import useDeleteLike from "../hooks/mutations/useDeleteLike";
import { useState } from "react";

const LpDetailPage = () => {
  const { lpId } = useParams<{ lpId: string }>();
  const { accessToken } = useAuth();
  const navigate = useNavigate();
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);

  const {
    data: lp,
    isPending,
    isError,
  } = useGetLpDetail({ lpId: Number(lpId) });
  const { data: me } = useGetMyInfo(accessToken);
  const { mutate: likeMutate } = usePostLike();
  const { mutate: disLikeMutate } = useDeleteLike();

  // const isLiked = lp?.data.likes
  //   .map((like)=>like.userId)
  //   .includes(me?.data.id as number);
  const isLiked = lp?.data.likes.some((like) => like.userId === me?.data.id);

  const handleLikeLp = () => {
    me?.data.id && likeMutate({ lpId: Number(lpId) });
  };

  const handleDislikeLp = () => {
    me?.data.id && disLikeMutate({ lpId: Number(lpId) });
  };

  if (isPending) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-black">
        <div className="text-white text-2xl">Loading...</div>
      </div>
    );
  }

  if (isError || !lp) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-black">
        <div className="text-white text-2xl">LP를 찾을 수 없습니다.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        {/* 뒤로가기 버튼 */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition"
        >
          ← 뒤로가기
        </button>

        {/* 썸네일 */}
        <img
          src={lp.data.thumbnail}
          alt={lp.data.title}
          className="w-full h-96 object-cover rounded-lg mb-6"
        />

        {/* 제목 */}
        <h1 className="text-4xl font-bold mb-4">{lp.data.title}</h1>

        {/* 작성자 & 날짜 */}
        <div className="flex items-center gap-4 mb-6 text-gray-400">
          <span>{lp.data.author.name}</span>
          <span>{new Date(lp.data.createdAt).toLocaleDateString()}</span>
          <span>{lp.data.likes.length} 좋아요</span>
        </div>

        {/* 태그 */}
        {lp.data.tags.length > 0 && (
          <div className="flex gap-2 mb-6">
            {lp.data.tags.map((tag) => (
              <span
                key={tag.id}
                className="px-3 py-1 bg-[#FF007F] bg-opacity-20 text-[#FFFFFF] rounded-full text-sm"
              >
                #{tag.name}
              </span>
            ))}
          </div>
        )}

        {/* 내용 */}
        <div className="bg-gray-900 p-6 rounded-lg">
          <p className="text-lg leading-relaxed whitespace-pre-wrap">
            {lp.data.content}
          </p>
        </div>

        <button
          className="cursor-pointer"
          onClick={isLiked ? handleDislikeLp : handleLikeLp}
        >
          <Heart
            color={isLiked ? "red" : "white"}
            fill={isLiked ? "red" : "transparent"}
          />
        </button>

        {/* 작성자 정보 */}
        <div className="mt-8 p-6 bg-gray-900 rounded-lg">
          <h2 className="text-xl font-bold mb-4">작성자 정보</h2>
          <div className="flex items-center gap-4">
            {lp.data.author.avatar ? (
              <img
                src={lp.data.author.avatar}
                alt={lp.data.author.name}
                className="w-16 h-16 rounded-full"
              />
            ) : (
              <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center text-2xl">
                👤
              </div>
            )}
            <div>
              <p className="font-bold">{lp.data.author.name}</p>
              <p className="text-gray-400">{lp.data.author.email}</p>
              {lp.data.author.bio && (
                <p className="text-sm mt-1">{lp.data.author.bio}</p>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* ✨ 댓글 보기 버튼 추가 */}
      <button
        onClick={() => setIsCommentModalOpen(true)}
        className="mt-6 w-full py-3 bg-[#FF007F] text-white rounded-lg hover:bg-pink-600 transition-colors font-semibold"
      >
        댓글 보기
      </button>

      <CommentModal
        isOpen={isCommentModalOpen}
        onClose={() => setIsCommentModalOpen(false)}
        lpId={Number(lpId)}
        lpTitle={lp.data.title}
      />
    </div>
  );
};

export default LpDetailPage;
