import { useParams, useNavigate } from "react-router-dom";
import useGetLpDetail from "../hooks/queries/useGetLpDetail.tsx";
import { Heart, Trash2, Pencil, Check, X } from "lucide-react";
import { useAuth } from "../context/context.tsx";
import usePostLike from "../hooks/mutations/like/usePostLike.ts";
import useDeleteLike from "../hooks/mutations/like/useDeleteLike.ts";
import useGetMyInfo from "../hooks/queries/useGetMyInfo.ts";
import useDeleteLp from "../hooks/mutations/lps/useDeleteLp.ts";
import usePatchLp from "../hooks/mutations/lps/usePatchLp.ts";
import CommentSection from "../components/ui/CommentSection.tsx";
import { useState } from "react";

export default function LpDetailPage() {
  const { lpId } = useParams();
  const { accessToken, isLogin } = useAuth();
  const navigate = useNavigate();

  const {
    data: lp,
    isPending: lpLoading,
    isError: lpError,
  } = useGetLpDetail({ lpId: Number(lpId) });
  const { data: me } = useGetMyInfo(accessToken);

  const { mutate: likeMutate } = usePostLike();
  const { mutate: dislikeMutate } = useDeleteLike();
  const { mutate: deleteLp } = useDeleteLp();
  const { mutate: patchLp } = usePatchLp();

  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const isLiked =
    lp?.data?.likes?.map((like) => like.userId).includes(me?.data?.id ?? -1) ??
    false;

  const isAuthor = lp?.data?.authorId === me?.data?.id;

  const handleLikeLp = () => likeMutate({ lpId: Number(lpId) });
  const handleDislikeLP = () => dislikeMutate({ lpId: Number(lpId) });

  const handleDelete = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      deleteLp(Number(lpId));
      navigate("/");
    }
  };

  const handleEditClick = () => {
    if (!isAuthor) return alert("작성자만 수정할 수 있습니다.");
    setTitle(lp?.data?.title ?? "");
    setContent(lp?.data?.content ?? "");
    setEditMode(true);
  };

  const handleCancelEdit = () => {
    setEditMode(false);
  };

  const handleSaveEdit = () => {
    if (!title.trim() || !content.trim()) {
      alert("제목과 내용을 모두 입력하세요.");
      return;
    }

    patchLp({
      lpId: Number(lpId),
      body: {
        title,
        content,
        thumbnail: lp?.data?.thumbnail ?? null,
        tagIds: lp?.data?.tags?.map((t) => t.id) ?? [],
      },
    });
    setEditMode(false);
  };

  if (lpLoading) return <div className="mt-12">게시글 불러오는 중...</div>;
  if (lpError || !lp) return <div className="mt-12">게시글 불러오기 실패</div>;

  return (
    <div className="max-w-3xl mx-auto mt-12 px-4 py-6 bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4 border-b pb-2">
        {editMode ? (
          <input
            className="text-2xl font-bold text-gray-800 border-b border-gray-300 focus:outline-none w-full"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          <h1 className="text-2xl font-bold text-gray-800">{lp.data.title}</h1>
        )}

        {isAuthor && !editMode && (
          <div className="flex items-center gap-2">
            <button
              onClick={handleEditClick}
              className="p-2 text-gray-500 hover:text-blue-600 transition"
            >
              <Pencil size={20} />
            </button>
            <button
              onClick={handleDelete}
              className="p-2 text-gray-500 hover:text-red-600 transition"
            >
              <Trash2 size={20} />
            </button>
          </div>
        )}

        {editMode && (
          <div className="flex items-center gap-2">
            <button
              onClick={handleSaveEdit}
              className="p-2 text-green-600 hover:text-green-800 transition"
            >
              <Check size={20} />
            </button>
            <button
              onClick={handleCancelEdit}
              className="p-2 text-gray-500 hover:text-gray-700 transition"
            >
              <X size={20} />
            </button>
          </div>
        )}
      </div>

      {lp.data.thumbnail && (
        <img
          src={lp.data.thumbnail}
          alt={lp.data.title}
          className="w-full h-64 object-cover rounded-md mb-6"
        />
      )}

      {editMode ? (
        <textarea
          className="w-full border border-gray-300 rounded-md p-2 mb-6 h-48 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      ) : (
        <p className="text-gray-700 leading-relaxed whitespace-pre-wrap mb-6">
          {lp.data.content}
        </p>
      )}

      태그들어갈자리

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

      <CommentSection
        lpId={Number(lpId)}
        isLogin={isLogin}
        myId={me?.data?.id}
      />
    </div>
  );
}
