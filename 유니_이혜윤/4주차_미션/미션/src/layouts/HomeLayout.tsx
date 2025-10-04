import { Outlet, useNavigate } from "react-router-dom";

const HomeLayout = () => {
  const navigate = useNavigate();

  return (
    <div className="h-dvh flex flex-col">
      <nav className="h-[60px] flex justify-between items-center px-6 border-b border-gray-200">
        <div onClick={() => navigate("/")} className="text-xl font-bold">
          Week_4
        </div>

        <div className="flex gap-1 text-xs">
          <button
            onClick={() => navigate("/login")}
            className="px-3 py-2 rounded-md hover:bg-gray-100 transition-colors cursor-pointer"
          >
            로그인
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="px-3 py-2 rounded-md hover:bg-gray-100 transition-colors cursor-pointer"
          >
            회원가입
          </button>
        </div>
      </nav>

      <main className="flex-1 bg-gray-50">
        <Outlet />
      </main>

      <footer className="h-[60px] flex items-center justify-center bg-gray-100 text-gray-600 text-xs">
        푸터입니다 🍪
      </footer>
    </div>
  );
};

export default HomeLayout;
