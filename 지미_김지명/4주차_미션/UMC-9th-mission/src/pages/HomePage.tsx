import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import { getMyInfo } from "../api/auth";
import axios from "axios";
import useGetLpList from "../hooks/queries/useGetLpList";

const HomePage = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  // LP 목록 가져오기
  const [search, setSearch] = useState("");
  const {data, isPending, isError} = useGetLpList({search});

  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = localStorage.getItem(LOCAL_STORAGE_KEY.accessToken);
      
      if (!token) {
        setIsLoggedIn(false);
        setIsCheckingAuth(false);
        return;
      }
      
      try {
        await getMyInfo();
        setIsLoggedIn(true);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          setIsLoggedIn(false);
          localStorage.removeItem(LOCAL_STORAGE_KEY.accessToken);
        }
      } finally {
        setIsCheckingAuth(false);
      }
    };
    
    checkAuthStatus();
  }, []);

  // 조건부 return은 모든 hooks 아래에
  if(isPending) {
    return <div className="text-white mt-20">Loading...</div>
  }

  if(isError) {
    return <div className="text-white mt-20">Error...</div>
  }

  return (
    <div className="flex flex-col justify-center items-center h-full bg-black gap-6 p-6">
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

      {/* LP 목록 표시 */}
      <div className={"mt-20"}>
        <input 
          value={search} 
          onChange={(e) => setSearch(e.target.value)} 
          className="text-black p-2"
        />
        {data?.data.data?.map((lp) => (
          <h1 key={lp.id} className="text-white">{lp.title}</h1>
        ))}
      </div>
      
    </div>
  );
}

export default HomePage