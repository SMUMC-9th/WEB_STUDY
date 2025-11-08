// 댓글 Skeleton UI

const CommentSkeleton = () => {
  return (
    <div className="animate-pulse border-b border-gray-200 py-4 space-y-2">
      <div className="h-4 bg-gray-300 rounded w-3/4" />
      <div className="h-3 bg-gray-200 rounded w-1/4" />
    </div>
  );
};

export default CommentSkeleton;

//animate-pulse : Tailwind의 기본 로딩 애니메이션
