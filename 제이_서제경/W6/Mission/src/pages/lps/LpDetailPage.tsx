import { useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import clsx from "clsx";
import { Heart, Pencil, Trash } from "lucide-react";

import usePostLike from "../../hooks/mutations/usePostLike";
import useDeleteLike from "../../hooks/mutations/useDeleteLike";

import useGetLpDetail from "../../hooks/queries/useGetLpDetail";
import useGetMyInfo from "../../hooks/queries/useGetMyInfo";

import LpCDThumbnail from "../../components/LpCard/LpCDThumbnail";
import CommentSection from "../../components/comment/CommentSection";

import { deleteLp } from "../../apis/lp";
import type { Likes } from "../../types/lp";

export default function LpDetailPage() {
  //url에서 lp id를 추출
  const { lpId } = useParams();
  const id = Number(lpId ?? 0);

  // AuthContext에서 accessToken 가져오기
  const { accessToken } = useAuth();

  // React Query로 LP 상세 정보 가져오기
  const { data: lpRes, isPending, isError } = useGetLpDetail({ lpId: id });

  // 로그인한 유저 정보 조회
  const { data: me } = useGetMyInfo(accessToken);

  // 좋아요 등록 / 취소 mutation 훅
  const { mutate: likeMutate } = usePostLike();
  const { mutate: disLikeMutate } = useDeleteLike();

  // LP 삭제 mutation (React Query)
  const queryClient = useQueryClient();
  const { mutate: deleteLPMutate, isPending: deleting } = useMutation({
    // mutationFn - 실행할 함수
    mutationFn: () => deleteLp({ lpId: id }),

    // 성공
    onSuccess: () => {
      alert("삭제가 완료되었습니다.");
      queryClient.invalidateQueries({ queryKey: ["lps"] });
      history.back();
    },
    // 실패
    onError: (err) => {
      console.error("삭제 실패:", err);
      alert("삭제 중 오류가 발생했습니다.");
    },
  });

  const lp = lpRes?.data;
  const myId = me?.data?.id;

  // 사용자가 좋아요 눌렀는지
  const isLiked =
    lp?.likes?.some((like: Likes) => like.userId === myId) ?? false;

  const handleLike = () => likeMutate({ lpId: id });
  const handleDislike = () => disLikeMutate({ lpId: id });
  const handleDelete = () => {
    if (confirm("정말 삭제하시겠어요?")) deleteLPMutate();
  };

  // 로딩 중, 에러 처리
  if (isPending) return <p className="text-gray-500 p-8">로딩 중...</p>;
  if (isError || !lp)
    return <p className="text-red-500 p-8">에러가 발생했습니다.</p>;

  return (
    <div className="bg-white flex justify-center px-4 py-12">
      <div className="bg-white w-full max-w-2xl rounded-2xl border border-gray-200 shadow-sm">
        {/* 정보 영역 */}
        <div className="px-6 pt-8">
          <div className="flex justify-between items-center text-sm text-gray-500 mb-3">
            <div className="flex items-center gap-2">
              <img
                src={lp.author?.avatarUrl || ""}
                alt=""
                className="w-8 h-8 rounded-full object-cover bg-gray-100"
              />
              <span className="font-medium text-gray-700">
                {lp.author?.name ?? "작성자"}
              </span>
            </div>
            <span>{new Date(lp.createdAt).toLocaleDateString()}</span>
          </div>

          <div className="flex justify-between items-center mb-6">
            <h1 className="text-[22px] font-semibold tracking-[-0.01em] text-gray-900">
              {lp.title}
            </h1>
            <div className="flex gap-1.5">
              <button
                title="수정"
                className="inline-flex items-center justify-center w-9 h-9 rounded-full hover:bg-gray-100 transition"
              >
                <Pencil size={18} className="text-gray-700" />
              </button>
              <button
                onClick={handleDelete}
                title="삭제"
                disabled={deleting}
                className={clsx(
                  "inline-flex items-center justify-center w-9 h-9 rounded-full hover:bg-gray-100 transition",
                  deleting && "opacity-60 cursor-not-allowed"
                )}
              >
                <Trash size={18} className="text-gray-700" />
              </button>
            </div>
          </div>
        </div>

        <LpCDThumbnail src={lp.thumbnail} alt={lp.title} />

        {/* 하단 */}
        <div className="px-6 pb-8">
          <p className="text-[15px] text-gray-700 leading-relaxed text-center">
            {lp.content}
          </p>

          <div className="mt-5 flex flex-wrap gap-2 justify-center">
            {lp.tags?.map((tag) => (
              <span
                key={tag.id}
                className="px-3 py-1 text-xs rounded-full border border-gray-200 bg-gray-50 text-gray-700"
              >
                #{tag.name}
              </span>
            ))}
          </div>

          <div className="mt-6 flex justify-center items-center gap-2">
            <button
              onClick={isLiked ? handleDislike : handleLike}
              title="좋아요"
              className="inline-flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition"
              aria-pressed={isLiked}
            >
              <Heart
                className={clsx(
                  "w-5 h-5",
                  isLiked ? "text-[#ff2d55]" : "text-gray-700"
                )}
                fill={isLiked ? "currentColor" : "none"}
              />
            </button>
            <span className="text-sm text-gray-800">
              {lp.likes?.length ?? 0}
            </span>
          </div>

          {lpId && (
            <div className="mt-8">
              <CommentSection lpId={lpId} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
