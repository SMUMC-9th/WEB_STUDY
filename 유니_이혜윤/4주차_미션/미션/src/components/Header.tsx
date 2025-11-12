import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const navigate = useNavigate();
  const { accessToken, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <nav className="h-[60px] flex justify-between items-center px-6 border-b border-gray-200">
      <div
        onClick={() => navigate("/")}
        className="text-xl font-bold cursor-pointer"
      >
        Week_4
      </div>

      <div className="flex gap-1 text-xs">
        {!accessToken ? (
          <>
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
          </>
        ) : (
          <>
            <button
              onClick={() => navigate("/my")}
              className="px-3 py-2 rounded-md hover:bg-gray-100 transition-colors cursor-pointer"
            >
              마이페이지
            </button>
            <button
              onClick={handleLogout}
              className="px-3 py-2 rounded-md hover:bg-gray-100 transition-colors cursor-pointer"
            >
              로그아웃
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Header;
