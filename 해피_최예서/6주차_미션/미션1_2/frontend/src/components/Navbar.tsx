import { NavLink } from "react-router-dom";
import { useLogin } from "../context/context.tsx";

export default function Navbar() {
  const { isLogin } = useLogin();

  return (
    <div className="flex p-2 justify-between bg-[#3086d9]">
      <NavLink to="/" className="text-black">
        돌려돌려 LP판
      </NavLink>
      <div>
        {isLogin ? (
          <>
            <NavLink
              to="/search"
              className={({ isActive }) =>
                isActive ? "px-3 py-1.5 bg-[#fbb411] rounded-xl" : "px-3 py-2"
              }
            >
              검색
            </NavLink>

            <NavLink
              to="/my"
              className={({ isActive }) =>
                isActive ? "px-3 py-1.5 bg-[#fbb411] rounded-xl" : "px-3 py-2"
              }
            >
              MY
            </NavLink>
          </>
        ) : (
          <>
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
          </>
        )}
      </div>
    </div>
  );
}
