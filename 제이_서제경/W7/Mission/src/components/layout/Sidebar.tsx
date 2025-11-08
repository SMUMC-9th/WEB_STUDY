import { Link } from "react-router-dom";
import { Search, User } from "lucide-react"; // lucide-react 아이콘 활용 추천

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-40 flex"
      onClick={onClose}
      aria-hidden="true"
    >
      {/* 배경  */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300"></div>

      {/* 사이드바 본체 */}
      <aside
        className={`relative top-0 left-0 h-full w-64 bg-white/70 dark:bg-neutral-900/70 backdrop-blur-xl shadow-[4px_0_16px_rgba(0,0,0,0.05)]
          border-r border-white/20 transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
        onClick={(e) => e.stopPropagation()} // 내부 클릭 시 닫힘 방지
      >
        <div className="flex flex-col h-full px-5 py-6">
          {/* 로고 */}
          <div className="text-lg font-semibold tracking-tight text-neutral-800 dark:text-neutral-100 mb-6">
            메뉴
          </div>

          {/* 링크 리스트 */}
          <nav className="flex flex-col gap-3 text-sm text-neutral-700 dark:text-neutral-300">
            <Link
              to="/search"
              onClick={onClose}
              className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-white/60 dark:hover:bg-neutral-800/50 transition-colors"
            >
              <Search size={18} />
              <span>찾기</span>
            </Link>

            <Link
              to="/mypage"
              onClick={onClose}
              className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-white/60 dark:hover:bg-neutral-800/50 transition-colors"
            >
              <User size={18} />
              <span>마이페이지</span>
            </Link>
          </nav>

          {/* 하단 영역 */}
          <div className="mt-auto border-t border-white/30 pt-4 text-xs text-neutral-400 dark:text-neutral-500">
            <p>© 2025 UMsiC</p>
          </div>
        </div>
      </aside>
    </div>
  );
};
