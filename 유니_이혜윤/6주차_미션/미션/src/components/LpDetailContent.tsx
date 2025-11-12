import { Heart } from "lucide-react";

type Props = {
  lp: {
    thumbnail: string;
    title: string;
    createdAt: string;
    author: { name: string; avatar?: string | null };
    tags?: Array<{ id: number; name: string }>;
  };
  isLiked: boolean;
  onToggleLike: () => void;
};

export default function LpDetailContent({ lp, isLiked, onToggleLike }: Props) {
  return (
    <div className="mb-4 rounded-md overflow-hidden shadow">
      <div className="relative">
        <img
          src={lp.thumbnail}
          alt={lp.title}
          className="w-full h-100 object-cover"
        />

        {/* 태그 */}
        {lp.tags?.length ? (
          <div className="absolute top-4 left-3 z-30 flex flex-wrap gap-1 max-w-[75%]">
            {lp.tags.map((tag) => (
              <span
                key={tag.id}
                className="inline-flex items-center rounded-full bg-black/40 text-white px-2 py-1.5 text-[11px] leading-none"
                title={`#${tag.name}`}
              >
                # {tag.name}
              </span>
            ))}
          </div>
        ) : null}

        {/* 좋아요 */}
        <button
          onClick={onToggleLike}
          className="z-20 absolute top-3 right-3 cursor-pointer"
          aria-label={isLiked ? "좋아요 취소" : "좋아요"}
        >
          <Heart
            className="w-6 h-6"
            color={isLiked ? "red" : "white"}
            fill={isLiked ? "red" : "transparent"}
          />
        </button>

        {/* 하단 오버레이 */}
        <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/20 p-3">
          <h1 className="text-white font-semibold text-base line-clamp-2">
            {lp.title}
          </h1>

          <div className="flex justify-between items-center text-xs text-gray-200 mt-2">
            <div className="flex items-center gap-2">
              <img
                src={
                  lp.author.avatar
                    ? lp.author.avatar
                    : "https://placehold.co/32x32?text=👤"
                }
                alt={lp.author.name}
                className="w-6 h-6 rounded-full object-cover border border-white/30"
              />
              <span className="text-[11px] font-medium">{lp.author.name}</span>
            </div>

            <span className="text-[11px] text-gray-100">
              {new Date(lp.createdAt).toLocaleDateString("ko-KR", {
                year: "2-digit",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
