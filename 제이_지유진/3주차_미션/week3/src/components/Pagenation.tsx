interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPrev,
  onNext,
}: PaginationProps) {
  return (
    <div className="flex justify-center gap-4 mt-6 mb-6 py-10">
      <button
        onClick={onPrev}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded disabled:opacity-50 transition-colors"
      >
        {"<"}
      </button>
      <span className="px-3 py-2 text-white">{currentPage} 페이지</span>
      <button
        onClick={onNext}
        disabled={currentPage === totalPages}
        className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded disabled:opacity-50 transition-colors"
      >
        {">"}
      </button>
    </div>
  );
}
