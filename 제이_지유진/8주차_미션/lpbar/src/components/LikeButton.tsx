import { useState } from "react";
import { Heart } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { likeLP, unlikeLP } from "../api/lp";
import type { AxiosError } from "axios";

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
  const [likes, setLikes] = useState(initialLikes);

  const hasLiked = likes.some((like) => like.userId === currentUserId);

  const likeMutation = useMutation({
    mutationFn: async ({ alreadyLiked }: { alreadyLiked: boolean }) => {
      try {
        if (alreadyLiked) {
          await unlikeLP(lpId);
        } else {
          await likeLP(lpId);
        }
      } catch (error: unknown) {
        const err = error as AxiosError;
        const status = err.response?.status;
        if (status === 404 || status === 409) return;
        throw err;
      }
    },

    onMutate: ({ alreadyLiked }) => {
      setLikes((prev) => {
        if (alreadyLiked) {
          return prev.filter((like) => like.userId !== currentUserId);
        }
        return [...prev, { userId: currentUserId! }];
      });
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["lp", lpId] });
    },
  });

  return (
    <button
      className="flex items-center gap-2 bg-gray-700 px-4 py-2 rounded-full"
      onClick={() => likeMutation.mutate({ alreadyLiked: hasLiked })}
      disabled={likeMutation.isPending}
    >
      <Heart
        size={20}
        className={hasLiked ? "fill-red-500 text-red-500" : "text-gray-300"}
      />
      <span className="text-white font-medium">{likes.length}</span>
    </button>
  );
}
