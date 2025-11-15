import { forwardRef, useState } from "react";
import { NavLink } from "react-router-dom";
import UserDeleteModal from "../modal/UserDeleteModal.tsx";

interface SidebarProps {
  open: boolean;
}

const Sidebar = forwardRef<HTMLDivElement, SidebarProps>(({ open }, ref) => {
  const [ismodalOpen, setIsmodalOpen] = useState(false);

  return (
    <div
      ref={ref}
      className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-[40]
        transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}`}
    >
      <div className="p-4 space-y-3 mt-14">
        <NavLink
          to="/search"
          className={({ isActive }) =>
            isActive
              ? "block px-3 py-1.5 bg-[#fbb411] rounded-xl"
              : "block px-3 py-2"
          }
        >
          검색
        </NavLink>

        <NavLink
          to="/my"
          className={({ isActive }) =>
            isActive
              ? "block px-3 py-1.5 bg-[#fbb411] rounded-xl"
              : "block px-3 py-2"
          }
        >
          MY
        </NavLink>

        <button
          onClick={() => setIsmodalOpen(true)}
          className="w-full px-3 py-2 text-left text-red-600 hover:bg-red-100 rounded-md transition"
        >
          탈퇴하기
        </button>

        {ismodalOpen && (
          <UserDeleteModal onClose={() => setIsmodalOpen(false)} />
        )}
      </div>
    </div>
  );
});

export default Sidebar;
