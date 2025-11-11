import type { Lp } from "../../types/lp.ts";
import { useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";

interface LpCardProps {
  lp: Lp;
}

const LpCard = ({ lp }: LpCardProps) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`lps/${lp.id}`)}
      className="relative rounded-lg overflow-hidden shadow-md cursor-pointer
                 transform transition-transform duration-300 hover:scale-105 group"
    >
      {/* 썸네일, 타이틀 */}
      <img
        src={lp.thumbnail}
        alt={lp.title}
        className="object-cover w-full h-48 transition-opacity duration-300 group-hover:opacity-70"
      />

      {/* 오버레이 */}
      <div
        className="absolute inset-0 bg-[rgba(0,0,0,0.5)] opacity-0
                   group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3"
      >
        <h3 className="text-white font-semibold text-sm truncate">{lp.title}</h3>

        {/* 메타 정보 */}
        <div className="flex items-center justify-between text-xs text-gray-300 mt-1">
          <p>{new Date(lp.createdAt).toLocaleDateString()}</p>
          <div className="flex items-center gap-1">
            <Heart size={14} color="white" />
            {/*<span>{lp.likesCount ?? 0}</span>*/}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LpCard;
