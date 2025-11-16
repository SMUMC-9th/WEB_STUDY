import { useEffect, useRef } from "react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const sidebarRef = useRef<HTMLDivElement>(null);

  // 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  // ESC 키로 사이드바 닫기
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscapeKey);
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isOpen, onClose]);

  return (
    <>
      {/* 오버레이 */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* 사이드바 - 스크롤 따라오기 */}
      <div
        ref={sidebarRef}
        className={`fixed top-0 left-0 h-screen w-56 bg-[#0A0A0A] border-r border-gray-800 text-white z-50 transform transition-transform duration-300 ease-in-out shadow-2xl ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:sticky lg:top-0`}
      >
        <div className="p-6">
          {/* 헤더 */}
          <div className="mb-8 pb-4 border-b border-gray-700">
            <h2 className="text-2xl font-bold text-[#FF007F]">카테고리</h2>
          </div>

          {/* 네비게이션 */}
          <nav className="space-y-2">
            <button className="w-full text-left px-4 py-3 rounded-lg bg-[#FF007F] text-white font-semibold">
              전체
            </button>
            <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-800 transition-all duration-200">
              <span className="font-medium">팝</span>
            </button>
            <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-800 transition-all duration-200">
              <span className="font-medium">록</span>
            </button>
            <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-800 transition-all duration-200">
              <span className="font-medium">재즈</span>
            </button>
            <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-800 transition-all duration-200">
              <span className="font-medium">클래식</span>
            </button>
            <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-800 transition-all duration-200">
              <span className="font-medium">힙합</span>
            </button>
          </nav>

          {/* 하단 장식 */}
          <div className="absolute bottom-8 left-6 right-6">
            <div className="h-1 bg-gradient-to-r from-[#FF007F] to-transparent rounded-full"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
