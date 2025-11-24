import { ChevronLeft, ChevronRight } from "lucide-react";

interface IPaginationProps {
  page: number;
  onPageChange: (page: number) => void;
}

const btnBase =
  "p-2 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100 active:bg-gray-200 transition disabled:text-gray-400 disabled:cursor-not-allowed";

export default function Pagination({ page, onPageChange }: IPaginationProps) {
  return (
    <div className="flex justify-center items-center gap-3 m-6">
      <button
        className={btnBase}
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      <span className="text-sm text-gray-500 tracking-wide">{page}</span>

      <button className={btnBase} onClick={() => onPageChange(page + 1)}>
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}
