import { NavLink } from "react-router-dom";
import { Popcorn } from "lucide-react";

const LINKS = [
  { to: "/", label: "홈" },
  { to: "/movies/popular", label: "인기" },
  { to: "/movies/now_playing", label: "상영 중" },
  { to: "/movies/top_rated", label: "평점 높은" },
  { to: "/movies/upcoming", label: "개봉 예정" },
];

const Navbar = () => {
  return (
    <div className="flex gap-4 p-5 fixed top-0 left-0 w-full z-50 bg-black/95">
      <h1 className="flex gap-1 font-extrabold text-[#b2dab1] mr-2">
        <Popcorn />
        YOON MOVIE
      </h1>
      {LINKS.map(({ to, label }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) => {
            return isActive ? "text-[#b2dab1] font-bold" : "text-gray-500";
          }}
        >
          {label}
        </NavLink>
      ))}
    </div>
  );
};

export default Navbar;
