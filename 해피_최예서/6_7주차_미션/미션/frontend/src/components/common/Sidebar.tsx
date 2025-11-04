import { forwardRef } from "react";
import { NavLink } from "react-router-dom";

interface SidebarProps {
  open: boolean;
}

const Sidebar = forwardRef<HTMLDivElement, SidebarProps>(({ open }, ref) => {
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
          className={({isActive}) =>
            isActive
              ? "block px-3 py-1.5 bg-[#fbb411] rounded-xl"
              : "block px-3 py-2"
          }
        >
          검색
        </NavLink>

        <NavLink
          to="/my"
          className={({isActive}) =>
            isActive
              ? "block px-3 py-1.5 bg-[#fbb411] rounded-xl"
              : "block px-3 py-2"
          }
        >
          MY
        </NavLink>

        <button className="block px-3 py-2 hover:bg-gray-100 rounded-lg text-left">
          탈퇴하기
        </button>
      </div>
    </div>
  );
});

export default Sidebar;
