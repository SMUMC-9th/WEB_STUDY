import React from "react";
import { useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";
import dayjs from "dayjs";

interface Like {
  id: number;
  userId: number;
  lpId: number;
}

interface LPCardProps {
  id: number;
  title: string;
  thumbnail: string;
  createdAt: string;
  likes: Like[];
}

const LpCard: React.FC<LPCardProps> = ({
  id,
  title,
  thumbnail,
  createdAt,
  likes,
}) => {
  const navigate = useNavigate();

  return (
    <div
      className="relative w-full max-w-xs aspect-square overflow-hidden shadow-md cursor-pointer transform transition-all duration-300 hover:scale-105"
      onClick={() => navigate(`/lp/${id}`)}
    >
      <img src={thumbnail} alt={title} className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity flex flex-col justify-end p-4 text-white">
        <h3 className="text-lg font-bold">{title}</h3>
        <p className="text-sm">{dayjs(createdAt).format("YYYY.MM.DD")}</p>
        <p className="text-sm flex items-center gap-1">
          <Heart className="fill-white" size={16} />
          {likes.length}
        </p>
      </div>
    </div>
  );
};

export default LpCard;
