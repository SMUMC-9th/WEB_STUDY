import {NavLink} from "react-router-dom";

const LINKS = [
  { to : '/', label: 'Home' },
  { to : '/movies/category/popular', label: 'Popular' },
  { to : '/movies/category/now_playing', label: 'now_playing' },
  { to : '/movies/category/top_rated', label: 'top_rated' },
  { to : '/movies/category/upcoming', label: 'upcoming' },
]

export default function Navbar() {
  return (
    <div className="flex gap-3 p-4">
      {LINKS.map(({ to, label }) => (
        <NavLink // NavLinK: 페이지 이동을 시켜줌. +) 현재 내가 있는 경로랑 같으면 active 상태를 자동으로 알려 줌.
          key={to} // map으로 반복 랜더링하기 때문에 key를 씀.
          to={to} // 주소 목적지
          className={({ isActive }) => // isActive : 현재 url이 to랑 같으면 true, 아니면 false
            isActive ? "text-red-500 font-bold" : "text-gray-500"
          }
        >
          {label}
        </NavLink>
      ))}
    </div>
  );
}