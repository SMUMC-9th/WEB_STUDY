import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="flex p-2 justify-between bg-[#3086d9]">
      <NavLink to="/" className="text-black">
        돌려돌려 LP판
      </NavLink>
      <div>
        <NavLink
          to="/signin"
          className={({ isActive }) =>
            isActive ? "px-3 py-1.5 bg-[#fbb411] rounded-xl" : "px-3 py-2"
          }
        >
          로그인
        </NavLink>
        <NavLink
          to="/signup"
          className={({ isActive }) =>
            isActive ? "px-3 py-1.5 bg-[#fbb411] rounded-xl" : "px-3 py-2"
          }
        >
          회원가입
        </NavLink>
      </div>
    </div>
  );
}
