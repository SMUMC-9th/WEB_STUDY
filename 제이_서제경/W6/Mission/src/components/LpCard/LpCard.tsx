import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Heart } from "lucide-react";
import type { Lp } from "../../types/lp";

// Lp 객체를 props로 받음
interface LpCardProps {
  lp: Lp;
}

// 시간 차이를 기반으로 상대 시간 문자열 반환
const getRelativeTime = (createdAt: Date) => {
  const now = new Date();
  const diffMs = now.getTime() - new Date(createdAt).getTime();
  const diffMin = Math.floor(diffMs / 60000);

  if (diffMin < 1) return "방금 전";
  if (diffMin < 60) return `${diffMin} mins ago`;

  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `${diffHr} hours ago`;

  return `${Math.floor(diffHr / 24)} days ago`;
};

const LpCard = ({ lp }: LpCardProps) => {
  const navigate = useNavigate(); // 페이지 이동을 위한 훅

  const { accessToken } = useContext(AuthContext); // 로그인 여부 확인
  const [showModal, setShowModal] = useState(false); // 로그인 경고 모달 상태

  // 카드 클릭 시 동작
  const handleClick = () => {
    if (!accessToken) {
      setShowModal(true); // 로그인 안 되어 있으면 모달 열기
      return;
    }
    navigate(`/lps/${lp.id}`); // 로그인 되어 있으면 LP 디테일 페이지로 이동
  };

  // 모달 내 '확인' 버튼 클릭 시 로그인 페이지로 이동
  const handleConfirm = () => {
    setShowModal(false);
    navigate("/login");
  };

  return (
    <>
      <div
        onClick={handleClick}
        className="cursor-pointer relative w-full aspect-square overflow-hidden rounded-none shadow-md hover:scale-105 transition-transform duration-300"
      >
        <img
          src={lp.thumbnail}
          alt={lp.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60 opacity-0 hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end px-4 pb-5">
          <h3 className="text-white text-sm font-semibold">{lp.title}</h3>
          <div className="flex justify-between items-center w-full mt-1">
            <p className="text-gray-300 text-xs">
              {getRelativeTime(new Date(lp.createdAt))}
            </p>
            <div className="flex items-center gap-1">
              <Heart size={14} className="text-white fill-white" />
              <span className="text-white text-xs">{lp.likes.length}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 로그인 필요 모달 */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-start z-50">
          <div className="bg-white text-black p-6 rounded-lg shadow-lg w-[350px]">
            <p className="text-xs text-gray-500 mb-4">
              {window.location.host}의 내용:
            </p>
            <p className="text-sm mb-4">로그인 후 이용해주세요!</p>
            <button
              onClick={handleConfirm}
              className="w-full py-2 bg-black text-white rounded hover:bg-gray-800 transition"
            >
              확인
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default LpCard;
