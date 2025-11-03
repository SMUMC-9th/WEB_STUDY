import { useParams } from "react-router-dom";
import useGetLpDetail from "../hooks/queries/useGetLpDetail.tsx";
import { Heart } from "lucide-react";
import useGetMyInfo from "../hooks/queries/useGetMyInfo.ts";
import { useAuth } from "../context/context.tsx"; // ✅ useAuth 대신 useLogin 사용
import usePostLike from "../hooks/mutations/usePostLike.ts";
import useDeleteLike from "../hooks/mutations/useDeleteLike.ts";

export default function LpDetailPage() {
  const { lpId } = useParams(); // url 에서 lpId 가져옴
  const { accessToken } = useAuth();

  const {
    data: lp,
    isPending,
    isError,
  } = useGetLpDetail({ lpId: Number(lpId) });

  const { data: me } = useGetMyInfo(accessToken);
  const { mutate: likeMutate } = usePostLike();
  const { mutate: dislikeMutate } = useDeleteLike();

  const isLiked =
    lp?.data?.likes?.map((like) => like.userId).includes(me?.data?.id ?? -1) ??
    false;

  const handleLikeLp = () => {
    likeMutate({ lpId: Number(lpId) });
  };

  const handleDislikeLP = () => {
    dislikeMutate({ lpId: Number(lpId) });
  };

  if (isPending) {
    return <div className="mt-12">Loading...</div>;
  }

  if (isError || !lp) {
    return <div className="mt-12">Error occurred!</div>;
  }

  return (
    <div className="mt-12">
      <h1 className="text-xl font-bold mb-2">{lp.data.title}</h1>
      <img src={lp.data.thumbnail} alt={lp.data.title} />
      <p>{lp.data.content}</p>

      <button onClick={isLiked ? handleDislikeLP : handleLikeLp}>
        <Heart
          color={isLiked ? "red" : "black"}
          fill={isLiked ? "red" : "transparent"}
        />
      </button>
    </div>
  );
}
