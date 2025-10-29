import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { getMyInfo } from "../api/auth";
import { postLogout } from "../api/auth";
import { LOCAL_STORAGE_KEY } from "../constants/key";

export default function Navbar() {
  const navigate = useNavigate();
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
      navigate('/');
    } catch (error) {
      console.error("로그아웃 실패:", error);
    }
  };

  return (
    <div className="flex flex-row items-center justify-between w-full h-24 px-8 bg-gray-900 shadow-lg p-3">
      <div
        onClick={() => navigate('/')}
        className="text-[#FF007F] text-2xl font-bold hover:cursor-pointer hover:text-pink-400 transition">
        돌려돌려 LP판
      </div>
      
      <div className="flex flex-row gap-3 items-center">
        {isLoading ? (
          <div className="text-white text-sm">로딩중...</div>
        ) : userName ? (
          <>
            <span className="text-white font-medium text-lg">{userName}님</span>
            <button 
              onClick={() => navigate('/my')}
              className="px-5 py-2.5 bg-black text-white border border-white rounded-md hover:bg-gray-800 transition cursor-pointer">
              마이페이지
            </button>
            <button 
              onClick={handleLogout}
              className="px-5 py-2.5 bg-[#FF007F] text-white rounded-md hover:bg-pink-600 transition cursor-pointer">
              로그아웃
            </button>
          </>
        ) : (
          <>
            <button 
              onClick={() => navigate('/login')}
              className="px-5 py-2.5 bg-black text-white border border-white rounded-md hover:bg-gray-900 transition cursor-pointer">
              로그인
            </button>
            <button 
              onClick={() => navigate('/signup')}
              className="px-5 py-2.5 bg-[#FF007F] text-white rounded-md hover:bg-pink-600 transition cursor-pointer">
              회원가입
            </button>
          </>
        )}
      </div>
    </div>
  );
}