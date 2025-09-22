import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "홈" },
    { path: "/popular", label: "인기 영화" },
    { path: "/now", label: "상영 중" },
    { path: "/top", label: "평점 높은" },
    { path: "/upcoming", label: "개봉 예정" },
  ];

  return (
    <nav className="fixed top-0 w-full bg-black text-white px-8 py-5 flex gap-6 shadow-[0_2px_6px_rgba(0,0,0,0.6)] z-50">
      {navItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={`relative transition-colors 
            ${
              location.pathname === item.path
                ? "text-red-400 font-semibold"
                : "text-gray-300 hover:text-white"
            }`}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
};

export default Navbar;
