import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { House, CircleUserRound } from "lucide-react";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const Sidebar = ({ open, onClose }: SidebarProps) => {
  const navigate = useNavigate();

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
            className="w-full flex gap-3 px-3 py-2 text-left rounded-md hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <House /> 홈
          </button>
          <button
            onClick={() => {
              navigate("/my");
              onClose();
            }}
            className="w-full flex gap-3 px-3 py-2 text-left rounded-md hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <CircleUserRound /> 마이페이지
          </button>
        </div>
      </aside>
    </>,
    document.body
  );
};

export default Sidebar;
