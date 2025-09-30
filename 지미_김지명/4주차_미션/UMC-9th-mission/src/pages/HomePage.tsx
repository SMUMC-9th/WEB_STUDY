import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { LOCAL_STORAGE_KEY } from "../constants/key";

const HomePage = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem(LOCAL_STORAGE_KEY.accessToken);
    setIsLoggedIn(!!token);
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