import { useState } from "react";
import type { TOrder } from "../constants/enum";
import SortButton from "./SortButton";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchCommentById } from "../api/lp";
import type { Comment } from "../types/comment";

export default function CommentDetail() {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<TOrder>("desc");
  const [comment, setComment] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  const {
    data: commentsData,
    isLoading,
    isError,
    refetch,
  } = useQuery<{ data: Comment[]; hasNext: boolean; nextCursor?: number }>({
    queryKey: ["comments", id, order],
    queryFn: () => fetchCommentById(Number(id)),
    staleTime: 1000 * 60,
    retry: 1,
  });

  const comments = Array.isArray(commentsData?.data) ? commentsData.data : [];

  if (isLoading) return <div className="text-gray-400">댓글 로딩 중...</div>;

  if (isError)
    return (
      <div className="text-gray-400">
        <p>댓글을 불러오지 못했습니다.</p>
        <button
          onClick={() => refetch()}
          className="mt-2 px-4 py-2 bg-gray-700 text-white rounded"
        >
          재시도
        </button>
      </div>
    );

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-white text-lg font-medium">댓글</h2>
        <SortButton
          order={order}
          onChange={(newOrder: TOrder) => setOrder(newOrder)}
        />
      </div>

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

      {comments.length === 0 ? (
        <p className="text-gray-400">댓글이 없습니다.</p>
      ) : (
        <ul>
          {comments.map((comment) => (
            <li
              key={comment.id}
              className="mb-4 p-4 border border-gray-600 rounded"
            >
              <div className="flex items-center mb-2 gap-2">
                <img
                  className="w-7 h-7 rounded-full inline-block mr-2"
                  src={comment.author?.avatar ?? undefined}
                ></img>
                <p className="text-gray-400 text-sm">
                  {comment.author?.name || "익명"}
                </p>
              </div>

              <p className="text-white">{comment.content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
