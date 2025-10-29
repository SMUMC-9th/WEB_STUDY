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
  const { data, isPending, isError } = useGetLpList({ 
    cursor: undefined, 
    search: undefined, 
    order: undefined, 
    limit: undefined 
  });

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
      <div className="w-full max-w-6xl mt-8">
        {isPending && <p className="text-white text-center">로딩 중...</p>}
        {isError && <p className="text-red-500 text-center">데이터를 불러오는데 실패했습니다.</p>}
        
        {data && Array.isArray(data.data) && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.data.map((lp: any) => (
              <div 
                key={lp.id}
                className="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition cursor-pointer"
                onClick={() => navigate(`/lp/${lp.id}`)}
              >
                {lp.thumbnail && (
                  <img 
                    src={lp.thumbnail} 
                    alt={lp.title}
                    className="w-full h-48 object-cover rounded-md mb-3"
                  />
                )}
                <h2 className="text-white text-xl font-bold mb-2">{lp.title}</h2>
                <p className="text-gray-400 text-sm line-clamp-2">{lp.content}</p>
                <div className="flex gap-2 mt-3 flex-wrap">
                  {lp.tags?.map((tag: any) => (
                    <span 
                      key={tag.id}
                      className="px-2 py-1 bg-[#FF007F] text-white text-xs rounded"
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between items-center mt-3 text-gray-500 text-sm">
                  <span>좋아요 {lp.likes?.length || 0}</span>
                  <span>{new Date(lp.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default HomePage