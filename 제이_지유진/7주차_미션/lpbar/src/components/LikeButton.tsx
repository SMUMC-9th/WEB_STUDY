import { useState } from "react";
import { Heart } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { likeLP, unlikeLP } from "../api/lp";

interface LikeButtonProps {
  lpId: number;
  initialLikes: { userId: number }[];
  currentUserId?: number;
}

export default function LikeButton({
  lpId,
  initialLikes,
  currentUserId,
}: LikeButtonProps) {
  const queryClient = useQueryClient();

  // 상태는 로컬에서 관리, 초기값은 서버에서 가져온 좋아요 배열
  const [likes, setLikes] = useState(initialLikes);

  // 현재 유저가 좋아요 했는지 여부
  const hasLiked = likes.some((like) => like.userId === currentUserId);

  const likeMutation = useMutation({
    mutationFn: async () => {
      try {
        if (hasLiked) {
          await unlikeLP(lpId);
        } else {
          await likeLP(lpId);
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        if (err.response?.status === 404 || err.response?.status === 409) {
          return;
        }
        throw err;
      }
    },
    onMutate: () => {
      setLikes((prev) => {
        const currentlyLiked = prev.some(
          (like) => like.userId === currentUserId
        );
        if (currentlyLiked) {
          return prev.filter((like) => like.userId !== currentUserId);
        } else {
          return [...prev, { userId: currentUserId! }];
        }
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["lp", lpId] });
    },
  });

  return (
    <button
      className="flex items-center gap-2 bg-gray-700 px-4 py-2 rounded-full"
      onClick={() => likeMutation.mutate()}
    >
      <Heart
        size={20}
        className={hasLiked ? "fill-red-500 text-red-500" : "text-gray-300"}
      />
      <span className="text-white font-medium">{likes.length}</span>
    </button>
  );
}
