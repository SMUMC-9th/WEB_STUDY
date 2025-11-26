import { NavLink } from "react-router-dom";

const Navbar = () => {
  const navItems = [
    { path: "/", label: "홈" },
    { path: "/popular", label: "인기 영화" },
    { path: "/now", label: "상영 중" },
    { path: "/top", label: "평점 높은" },
    { path: "/upcoming", label: "개봉 예정" },
  ];

  return (
    <nav className="fixed top-0 w-full bg-black text-white px-8 py-5 flex gap-8 shadow-[0_2px_6px_rgba(0,0,0,0.6)] z-50">
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          end
          className={({ isActive }) =>
            `relative transition-colors duration-300 
             ${
               isActive
                 ? "text-red-400 font-semibold"
                 : "text-gray-300 hover:text-white"
             }`
          }
        >
          {({ isActive }) => (
            <>
              {item.label}
              <span
                className={`absolute left-0 -bottom-1 h-[2px] w-full transform transition-transform duration-300 
                  ${
                    isActive
                      ? "scale-x-100 bg-red-400"
                      : "scale-x-0 bg-white group-hover:scale-x-100"
                  }`}
              />
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
};

export default Navbar;
