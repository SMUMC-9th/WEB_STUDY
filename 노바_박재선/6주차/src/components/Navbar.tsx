
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import { getMyInfo, postLogout } from "../apis/auth";

interface NavbarProps {
  onMenuClick: () => void; 
}

export default function Navbar({onMenuClick}: NavbarProps) {
  const nav = useNavigate();
  const { accessToken, setAccessToken } = useAuth();
  const { refreshToken, setRefreshToken } = useAuth();
  const [userName, setUserName] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (accessToken) {
        try {
          const response = await getMyInfo();
          setUserName(response.data.name); 
        } catch (error) {
          console.error("사용자 정보 가져오기 실패:", error);
          setUserName(null);
        }
      } else {
        setUserName(null);
      }
      setIsLoading(false);
    };

    fetchUserInfo();
  }, [accessToken]);

  const handleLogout = async () => {
    try {
      await postLogout();
      localStorage.removeItem(LOCAL_STORAGE_KEY.accessToken);
      localStorage.removeItem(LOCAL_STORAGE_KEY.refreshToken);
      setAccessToken(null);
      setRefreshToken(null);
      setUserName(null);
      nav('/');
    } catch (error) {
      console.error("로그아웃 실패:", error);
    }
  };

  return (
    <div className="flex flex-row items-center justify-between w-full h-24 px-8 bg-black shadow-lg p-3 flex-shrink-0">
        <div className="flex items-center gap-4">
          <button 
            className="h-20 w-20 p-2 rounded-md cursor-pointer lg-hidden hover:text-gray-500 transition"
            onClick={onMenuClick}
          >
            <svg width="48" height="48" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M7.95 11.95h32m-32 12h32m-32 12h32"/></svg>
          </button>

          <div
            onClick={() => nav('/')}
            className="text-[#FF007F] text-2xl font-bold hover:cursor-pointer hover:text-pink-400 transition">
            돌려돌려 LP판
          </div>
        </div>
        
    
        
        <div className="flex flex-row gap-3 items-center">
          {isLoading ? (
            <div className="text-white text-sm">로딩중...</div>
          ) : userName ? (
            <>
              <button className="h-18 w-18 text-white p-2 rounded-md cursor-pointer">
                🔎
              </button>
              <span className="text-white font-medium text-lg">
                {userName}님 반갑습니다.</span>
              {/* <button 
                onClick={() => nav('/my')}
                className="px-5 py-2.5 bg-black text-white border border-none rounded-md hover:bg-gray-900 transition cursor-pointer">
                마이페이지
              </button> */}
              <button 
                onClick={handleLogout}
                className="px-5 py-2.5 bg-[#FF007F] text-white rounded-md hover:bg-pink-600 transition cursor-pointer">
                로그아웃
              </button>
            </>
          ) : (
            <>
              <button 
                onClick={() => nav('/login')}
                className="px-5 py-2.5 bg-black text-white border border-white rounded-md hover:bg-gray-900 transition cursor-pointer">
                로그인
              </button>
              <button 
                onClick={() => nav('/signup')}
                className="px-5 py-2.5 bg-[#FF007F] text-white rounded-md hover:bg-pink-600 transition cursor-pointer">
                회원가입
              </button>
            </>
          )}
        </div>
      </div>
  );
}