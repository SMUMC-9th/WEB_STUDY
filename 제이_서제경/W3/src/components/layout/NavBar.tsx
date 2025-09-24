import { NavLink } from "react-router-dom";

type LinkItem = { to: string; label: string };

// 기본 경로 분리 : 피드백 반영
const MOVIE_BASE = "/movie";

const LINKS: LinkItem[] = [
  { to: "/", label: "홈" },

  // 영화 세부 링크들 나눠서 추가
  { to: `${MOVIE_BASE}/popular`, label: "인기 영화" },
  { to: `${MOVIE_BASE}/now_playing`, label: "상영 중" },
  { to: `${MOVIE_BASE}/top_rated`, label: "평점 높은 영화" },
  { to: `${MOVIE_BASE}/upcoming`, label: "개봉 예정 영화" },
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
            key={to} // 각 링크 고유 식별 key
            to={to} // 링크 경로 - map으로 동적 생성
            end={to === "/"} // 홈 경로에만 end 속성 적용
            className={({ isActive }) => getLinkClass(isActive)} // 지금 경로가 활성 상태인가 -> 클래스 지정
          >
            {/* 화면에 표시될 링크 텍스트 */}
            {label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};
