import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import { getMyInfo } from "../api/auth";
import axios from "axios";

const HomePage = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = localStorage.getItem(LOCAL_STORAGE_KEY.accessToken);
      
      // 토큰 자체가 없으면 로그아웃 상태
      if (!token) {
        setIsLoggedIn(false);
        setIsCheckingAuth(false);
        return;
      }
      
      // 토큰이 있으면 실제로 유효한지 서버에 확인
      try {
        await getMyInfo(); // 인증 필요한 API 호출
        setIsLoggedIn(true); // 200 응답 → 유효한 토큰
      } catch (error) {
        // 401 등 에러 → 유효하지 않은 토큰
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          setIsLoggedIn(false);
          localStorage.removeItem(LOCAL_STORAGE_KEY.accessToken); // 무효한 토큰 제거
        }
      } finally {
        setIsCheckingAuth(false);
      }
    };
    
    checkAuthStatus();
  }, []);


  return (
    <div className="flex flex-col justify-center items-center h-full bg-black gap-6">
      <p className="text-white text-8xl">돌려돌려 LP판</p>
      
      {isLoggedIn && (
        <div className="flex flex-col items-center gap-4">
          <p className="text-white text-2xl">로그인 되었습니다!</p>
          <button 
            onClick={() => navigate('/my')}
            className="px-6 py-3 bg-[#FF007F] text-white text-lg rounded-md hover:bg-pink-600 transition cursor-pointer">
            마이페이지 가기
          </button>
        </div>
      )}
    </div>
  )
}

export default HomePage