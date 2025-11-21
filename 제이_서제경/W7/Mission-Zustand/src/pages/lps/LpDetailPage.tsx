import { useParams } from "react-router-dom";
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
import { useAuthStore } from "../../stores/authStore";

export default function LpDetailPage() {
  // 1) URL에서 lpId 추출
  const { lpId } = useParams();
  const id = Number(lpId ?? 0);

  // 2) 인증 컨텍스트/내 정보/LP 상세 조회
  const accessToken = useAuthStore((s) => s.accessToken);
  const { data: lpRes, isPending, isError } = useGetLpDetail({ lpId: id });
  const { data: me } = useGetMyInfo(accessToken);

  // 3) 좋아요 추가/취소 mutation
  const { mutate: likeMutate, isPending: likePending } = usePostLike();
  const { mutate: disLikeMutate, isPending: dislikePending } = useDeleteLike();

  const queryClient = useQueryClient();

  // 4) 게시글 삭제 mutation
  const { mutate: deleteLPMutate, isPending: deleting } = useMutation({
    mutationFn: () => deleteLp({ lpId: id }),
    onSuccess: () => {
      alert("삭제가 완료되었습니다.");
      queryClient.invalidateQueries({ queryKey: ["lps"] });
      history.back();
    },
    onError: (err) => {
      console.error("삭제 실패:", err);
      alert("삭제 중 오류가 발생했습니다.");
    },
  });

  // 5) 조회 응답 편의 변수
  const lp = lpRes?.data;
  const myId = me?.data?.id;

  // 6) 현재 내가 좋아요를 눌렀는지 여부 (렌더링용 파생 상태)
  const isLiked = (lp?.likes ?? []).some(
    (l) => String(l.userId) === String(myId)
  );

  // 7) 좋아요 토글 핸들러
  const toggling = likePending || dislikePending;
  const handleToggleLike = () => {
    if (!myId) {
      alert("로그인 후 이용해주세요.");
      return;
    }
    if (toggling) return; // 연타, 중복 요청 방지

    if (isLiked) disLikeMutate({ lpId: id });
    else likeMutate({ lpId: id });
  };

  // 8) 삭제 버튼 핸들러
  const handleDelete = () => {
    if (confirm("정말 삭제하시겠어요?")) deleteLPMutate();
  };

  // 9) 로딩/에러 처리
  if (isPending) return <p className="text-gray-500 p-8">로딩 중...</p>;
  if (isError || !lp)
    return <p className="text-red-500 p-8">에러가 발생했습니다.</p>;

  return (
    <div className="bg-white flex justify-center px-4 py-12">
      <div className="bg-white w-full max-w-2xl rounded-2xl border border-gray-200 shadow-sm">
        {/* 상단 정보 영역 */}
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

        {/* 썸네일 */}
        <LpCDThumbnail src={lp.thumbnail} alt={lp.title} />

        {/* 본문/태그/좋아요/댓글 */}
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

          {/* 좋아요 토글*/}
          <div className="mt-6 flex justify-center items-center gap-2">
            <button
              onClick={handleToggleLike}
              title={isLiked ? "좋아요 취소" : "좋아요"}
              className="inline-flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition"
              aria-pressed={isLiked}
              disabled={toggling || !myId}
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

          {/* 댓글 */}
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
