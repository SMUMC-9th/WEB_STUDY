import { useEffect, useState } from "react";
import type { TOrder } from "../constants/enum";
import SortButton from "./SortButton";
import { useParams } from "react-router-dom";
import useGetComment from "../hooks/useGetComment";
import SkeletonCard from "./SkeletonCard";
import CommentTab from "./CommentTab";
import { useInView } from "react-intersection-observer";

export default function CommentDetail() {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<TOrder>("desc");
  const [comment, setComment] = useState("");
  const [ref, inView] = useInView();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  // const {
  //   data: commentsData,
  //   isLoading,
  //   isError,
  //   refetch,
  // } = useQuery<{ data: Comment[]; hasNext: boolean; nextCursor?: number }>({
  //   queryKey: ["comments", id, order],
  //   queryFn: () => fetchCommentById(Number(id)),
  //   staleTime: 1000 * 60,
  //   retry: 1,
  // });
  const {
    data,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    isLoading,
    isError,
    refetch,
  } = useGetComment({ order, cursor: 0, lpId: Number(id) });

  // const comments = Array.isArray(commentsData?.data) ? commentsData.data : [];

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-white text-lg font-medium">댓글</h2>
        <SortButton
          order={order}
          onChange={(newOrder: TOrder) => setOrder(newOrder)}
        />
      </div>

      {isLoading && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      )}

      {isError && (
        <div className="flex flex-col items-center mt-10">
          <p className="text-red-500 mb-2">데이터를 불러오지 못했습니다.</p>
          <button
            className="px-4 py-2 bg-black text-white rounded"
            onClick={() => refetch()}
          >
            재시도
          </button>
        </div>
      )}
      <div className="mt-4 flex gap-2 mb-6">
        <input
          type="text"
          placeholder="댓글을 입력해주세요"
          onChange={handleChange}
          value={comment}
          className="flex-1 px-3 py-2 rounded-md bg-[#272A30] text-white placeholder-gray-400 border-2 border-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
        />
        <button
          disabled={!comment.trim()}
          className={`px-4 py-2 rounded-md text-white transition ${
            comment.trim()
              ? "bg-pink-600 hover:bg-pink-700"
              : "bg-gray-600 cursor-not-allowed"
          }`}
        >
          작성
        </button>
      </div>

      {!isLoading && !isError && (
        <>
          <ul>
            {data?.pages.map((comment) =>
              comment.data.data.map((c) => (
                <CommentTab key={c.id} comment={c} />
              ))
            )}
          </ul>
        </>
      )}

      {/* 무한 스크롤 감지용 div */}
      <div ref={ref} className="h-10 flex justify-center items-center">
        {isFetchingNextPage && <p>불러오는 중...</p>}
      </div>
    </div>
  );
}
