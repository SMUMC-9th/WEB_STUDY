import { useNavigate } from "react-router-dom";
import type { TLP } from "../types/lp";
import { Heart } from "lucide-react";

interface LpCardProps {
  lp: TLP;
}

const LpCard = ({ lp }: LpCardProps) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`detail/${lp.id}`, { state: { lp } })}
      className="relative cursor-pointer hover:scale-105 transition-transform rounded-md overflow-hidden shadow"
    >
      <img
        src={lp.thumbnail}
        alt={lp.title}
        className="w-full h-48 object-cover brightness-75 transition-all duration-300"
      />

      <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/60 to-transparent p-3">
        <h1 className="text-white font-semibold text-xs line-clamp-2">
          {lp.title}
        </h1>

        <div className="flex justify-between items-center text-[10px] text-gray-200 mt-1">
          <span>
            {new Date(lp.createdAt).toLocaleDateString("ko-KR", {
              year: "2-digit",
              month: "2-digit",
              day: "2-digit",
            })}
          </span>

          <div className="flex items-center gap-1">
            <Heart className="w-3.5 h-3.5 text-red-400" />
            <span>0</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LpCard;
