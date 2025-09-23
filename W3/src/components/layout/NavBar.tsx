import { NavLink } from "react-router-dom";

type LinkItem = { to: string; label: string };

// 네비게이션 메뉴 배열
const LINKS: LinkItem[] = [
  { to: "/", label: "홈" },
  { to: "/movies/popular", label: "인기 영화" },
  { to: "/movies/now_playing", label: "상영 중" },
  { to: "/movies/top_rated", label: "평점 높은 영화" },
  { to: "/movies/upcoming", label: "개봉 예정 영화" },
];

// 공통 스타일 클래스 지정
const LINK_CLASS = {
  base: "relative rounded-full px-3 py-1.5 text-sm transition-colors",
  idle: "text-gray-500 hover:text-black hover:bg-gray-100 dark:hover:bg-white/10 dark:hover:text-white",
  active: "font-semibold text-[#0f1015] dark:text-white ",
};

const getLinkClass = (isActive: boolean) =>
  `${LINK_CLASS.base} ${isActive ? LINK_CLASS.active : LINK_CLASS.idle}`;

export const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 w-full ">
      <div className="mx-auto flex max-w-5xl justify-center items-center gap-3 overflow-x-auto p-3">
        {LINKS.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/"}
            className={({ isActive }) => getLinkClass(isActive)}
          >
            {label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};
