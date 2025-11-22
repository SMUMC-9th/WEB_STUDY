import { PAGINATION_ORDER } from "../../enums/common";

interface SortButtonsProps {
  sortOrder: PAGINATION_ORDER;
  onSortChange: (order: PAGINATION_ORDER) => void;
}

const SortButtons = ({ sortOrder, onSortChange }: SortButtonsProps) => {
  return (
    <div className="px-6 py-3 border-b border-gray-700 flex gap-2">
      <button
        onClick={() => onSortChange(PAGINATION_ORDER.desc)}
        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
          sortOrder === PAGINATION_ORDER.desc
            ? "bg-[#FF007F] text-white"
            : "bg-gray-700 text-gray-300 hover:bg-gray-600"
        }`}
      >
        최신순
      </button>
      <button
        onClick={() => onSortChange(PAGINATION_ORDER.asc)}
        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
          sortOrder === PAGINATION_ORDER.asc
            ? "bg-[#FF007F] text-white"
            : "bg-gray-700 text-gray-300 hover:bg-gray-600"
        }`}
      >
        오래된순
      </button>
    </div>
  );
};

export default SortButtons;
