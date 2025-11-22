import { NavLink, useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";
import { useAuthStore } from "../../stores/authStore";
import type { Dispatch } from "react";

type HeaderProps = {
  setSidebarOpen: Dispatch<React.SetStateAction<boolean>>;
};

export default function Header({ setSidebarOpen }: HeaderProps) {
  const navigate = useNavigate();

  const accessToken = useAuthStore((s) => s.accessToken);
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  const pillBase =
    "relative rounded-full px-3.5 py-1.5 text-sm font-medium transition-all duration-200 ease-in-out";
  const pillInactive =
    "text-neutral-600 hover:text-neutral-900 bg-white/50 hover:bg-white/80 shadow-[0_1px_3px_rgba(0,0,0,0.04)] backdrop-blur-md";
  const pillActive =
    "bg-neutral-800 text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.15)]";

  const handleLogout = async () => {
    await logout();
    alert("로그아웃 되었습니다.");
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-40 border-b border-black/10 bg-white/60 backdrop-blur-md shadow-[0_2px_10px_rgba(0,0,0,0.04)] transition-all duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex h-14 items-center justify-between">
          {/* 왼쪽 로고 + 메뉴 */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-[22px] text-neutral-800 hover:opacity-70 transition-all duration-200 active:scale-95"
              aria-label="메뉴 열기"
            >
              <Menu />
            </button>

            <NavLink
              to="/"
              className="text-[18px] font-[550] tracking-tight text-neutral-900 hover:opacity-80 transition-opacity"
            >
              UMsiC
            </NavLink>
          </div>

          {/* 오른쪽 네비게이션 */}
          <nav className="flex items-center gap-2">
            {accessToken ? (
              <>
                <span className="align-middle text-sm text-neutral-600">
                  {user?.name}님 반갑습니다
                </span>

                <NavLink
                  to="/mypage"
                  className={({ isActive }) =>
                    [pillBase, isActive ? pillActive : pillInactive].join(" ")
                  }
                >
                  마이페이지
                </NavLink>

                <button
                  type="button"
                  onClick={handleLogout}
                  className={[pillBase, pillInactive].join(" ")}
                >
                  로그아웃
                </button>
              </>
            ) : (
              <>
                <NavLink
                  to="/login"
                  end
                  className={({ isActive }) =>
                    [pillBase, isActive ? pillActive : pillInactive].join(" ")
                  }
                >
                  로그인
                </NavLink>

                <NavLink
                  to="/signup"
                  className={({ isActive }) =>
                    [pillBase, isActive ? pillActive : pillInactive].join(" ")
                  }
                >
                  회원가입
                </NavLink>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
