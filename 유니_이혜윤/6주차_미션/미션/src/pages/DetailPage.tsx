import { useParams } from "react-router-dom";
import useGetLpDetail from "../hooks/useGetLpDetail";
import useGetMyInfo from "../hooks/useGetMyInfo";
import usePostLike from "../hooks/mutations/usePostLike";
import useDeleteLike from "../hooks/mutations/useDeleteLike";
import { LpDetailContent, LpComments } from "../components";

const DetailPage = () => {
  const param = useParams();
  const lpId = Number(param.lpId);

  const {
    data: lpResponse,
    isPending: isLpLoading,
    isError: isLpError,
  } = useGetLpDetail({ lpId });
  const lp = lpResponse?.data;

  // 내 정보
  const { data: my } = useGetMyInfo();

  // 좋아요
  const { mutate: likeMutate } = usePostLike();
  const { mutate: disLikeMutate } = useDeleteLike();

  const isLiked =
    !!lp &&
    !!my?.data?.id &&
    lp.likes?.some((like) => like.userId === my.data.id);

  const handleToggleLike = () => {
    if (!lpId) return;
    if (isLiked) disLikeMutate({ lpId });
    else likeMutate({ lpId });
  };

  if (isLpError)
    return <div className="p-3">Lp 상세 정보를 불러오지 못했습니다.</div>;

  return (
    <div className="p-3">
      {isLpLoading ? (
        <div className="mb-4 h-40 rounded-md bg-gray-100 animate-pulse" />
      ) : (
        lp && (
          <>
            <LpDetailContent
              lp={lp}
              isLiked={isLiked}
              onToggleLike={handleToggleLike}
            />
            <LpComments lpId={lpId} />
          </>
        )
      )}
    </div>
  );
};

export default DetailPage;
