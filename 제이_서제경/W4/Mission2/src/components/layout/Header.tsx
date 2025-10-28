import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-black/5 backdrop-blur-xl bg-white/60 dark:bg-neutral-900/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex h-14 items-center justify-between">
          <NavLink
            to="/"
            className="text-[17px] font-semibold tracking-tight text-neutral-900 dark:text-neutral-100 hover:opacity-90 transition-opacity"
          >
            UMsiC
          </NavLink>

          <nav className="flex items-center gap-1.5">
            <NavLink
              to="/login"
              end
              className={({ isActive }) =>
                [
                  "relative rounded-2xl px-3.5 py-1.5 text-sm font-medium transition-colors",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-black/10 dark:focus-visible:ring-white/10",
                  isActive
                    ? "bg-neutral-200 text-neutral-900 dark:bg-neutral-800 dark:text-neutral-100 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.04)]"
                    : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:text-neutral-100 dark:hover:bg-neutral-800/70",
                ].join(" ")
              }
            >
              로그인
            </NavLink>

            <NavLink
              to="/signup"
              className={({ isActive }) =>
                [
                  "relative rounded-2xl px-3.5 py-1.5 text-sm font-medium transition-colors",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-black/10 dark:focus-visible:ring-white/10",
                  isActive
                    ? "bg-neutral-200 text-neutral-900 dark:bg-neutral-800 dark:text-neutral-100 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.04)]"
                    : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:text-neutral-100 dark:hover:bg-neutral-800/70",
                ].join(" ")
              }
            >
              회원가입
            </NavLink>
          </nav>
        </div>
      </div>
    </header>
  );
}

// Point :
// NavLink의 className에 isActive를 활용하여 현재 경로에 따라 스타일이 동적으로 변경되도록 구현
// isActive가 true일 때와 false일 때 각각 다른 스타일을 적용
// [].join(" ")를 사용하여 여러 클래스를 하나의 문자열로 결합
