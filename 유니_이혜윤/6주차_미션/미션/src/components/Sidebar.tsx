import { useEffect } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const Sidebar = ({ open, onClose }: SidebarProps) => {
  const navigate = useNavigate();

  // ESC 키로 닫기 + 스크롤 잠금
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (open) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  return createPortal(
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/40 transition-opacity duration-300 z-[90] ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />

      <aside
        className={`fixed top-0 right-0 h-dvh w-64 bg-white shadow-xl z-[100]
          transition-transform duration-300 ease-in-out
          ${open ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <div className="h-[60px] flex justify-end px-4">
          <button
            onClick={onClose}
            aria-label="닫기"
            className="cursor-pointer"
          >
            ✕
          </button>
        </div>

        <div className="p-4 flex flex-col gap-2">
          <button
            onClick={() => {
              navigate("/");
              onClose();
            }}
            className="w-full px-3 py-2 text-left rounded-md hover:bg-gray-100 transition-colors cursor-pointer"
          >
            홈
          </button>
          <button
            onClick={() => {
              navigate("/my");
              onClose();
            }}
            className="w-full px-3 py-2 text-left rounded-md hover:bg-gray-100 transition-colors cursor-pointer"
          >
            마이페이지
          </button>
        </div>
      </aside>
    </>,
    document.body
  );
};

export default Sidebar;
