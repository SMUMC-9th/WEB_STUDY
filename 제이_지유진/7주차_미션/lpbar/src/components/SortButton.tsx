import type { TOrder } from "../constants/enum";

// 정렬 버튼 타입 선언
interface SortButtonsProps {
  order: TOrder;
  onChange: (newOrder: TOrder) => void;
}

const SortButton = ({ order, onChange }: SortButtonsProps) => {
  return (
    <div className="flex gap-2 mb-6 justify-center">
      <button
        className={`px-4 py-2 rounded font-medium border transition-colors duration-200 ${
          order === "desc"
            ? "bg-black text-white border-black"
            : "bg-white text-black border-black"
        }`}
        onClick={() => onChange("desc")}
      >
        최신순
      </button>
      <button
        className={`px-4 py-2 rounded font-medium border transition-colors duration-200 ${
          order === "asc"
            ? "bg-black text-white border-black"
            : "bg-white text-black border-black"
        }`}
        onClick={() => onChange("asc")}
      >
        오래된순
      </button>
    </div>
  );
};

export default SortButton;
