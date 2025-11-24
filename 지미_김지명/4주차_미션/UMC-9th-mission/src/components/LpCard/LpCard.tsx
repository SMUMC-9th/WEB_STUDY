import { useNavigate } from "react-router-dom";

interface LpCardProps {
  id: number;
  title: string;
  thumbnail: string;
  createdAt?: Date;
  likesCount?: number;
}

const LpCard = ({ id, title, thumbnail, createdAt, likesCount }: LpCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/lp/${id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="relative rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer group"
    >
      {/* 이미지 - 호버 시 확대 */}
      <img
        src={thumbnail}
        alt={title}
        className="object-cover w-full h-48 group-hover:scale-110 transition-transform duration-300"
      />
      
      {/* 기본 제목 (항상 표시) */}
      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 p-2">
        <h3 className="text-white text-sm font-semibold truncate">{title}</h3>
      </div>

      {/* 호버 시 오버레이 + 메타 정보 */}
      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-70 transition-all duration-300 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100">
        <h3 className="text-white text-lg font-bold mb-2 px-4 text-center">{title}</h3>
        <div className="flex gap-4 text-white text-sm">
          {createdAt && (
            <span>📅 {new Date(createdAt).toLocaleDateString()}</span>
          )}
          {likesCount !== undefined && (
            <span>❤️ {likesCount}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default LpCard;