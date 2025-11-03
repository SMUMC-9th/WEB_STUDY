
import {  Outlet, useLocation, useNavigate } from "react-router-dom"; 
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react"; 

const SidebarContent = ({ onClose }: { onClose?: () => void }) => {
  const nav = useNavigate();
  const handleNavigate = (path: string) => {
    nav(path);
    onClose?.(); 
  };

  return (
    <div className="flex flex-col w-60 h-full relative">
      <nav className="flex flex-col space-y-4 mt-10 p-6">
        <button
          onClick={() => handleNavigate('/search')}
          className="text-gray-300 hover:text-white p-3 rounded-md text-lg text-left cursor-pointer transition"
        >
          🔎 찾기
        </button>
        <button
          onClick={() => handleNavigate('/mypage')}
          className="text-gray-300 hover:text-white p-3 rounded-md text-lg text-left cursor-pointer transition"
        >
          🤍 마이페이지
        </button>
      </nav>
      <nav className="absolute bottom-[30px] left-[30px]">
        <button
            onClick={()=>handleNavigate('/withdraw')}
            className="text-gray-500 hover:text-white hover:bg-gray-800 p-3 rounded-md text-sm text-left w-full cursor-pointer transition"
        >
            탈퇴하기
        </button>
      </nav>
    </div>
  );
};


const ProtectedLayout = () => {
  const { accessToken } = useAuth();
  const nav = useNavigate();
  const location = useLocation();
  
  useEffect(()=> {
    if(!accessToken){
      alert("로그인이 필요한 서비스입니다. 로그인 해주세요!");
      nav('/login',{
        replace: true, 
        state: {from: location}
      })
    }
  }, [accessToken, nav, location]);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  if (!accessToken) {
    return null; 
  }

  return (
    <div className="flex flex-col h-screen bg-neutral-900 text-white">
      <Navbar onMenuClick={()=> setIsSidebarOpen((prev)=>!prev)}/>
      <div className="flex flex-1 overflow-hidden">
        <aside className="hidden lg:flex flex-shrink-0 w-60 bg-black">
          <SidebarContent />
        </aside>
        <>
          <div 
            className={`fixed inset-0 top-24 z-40 lg:hidden
                        transition-opacity duration-300
                        ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            onClick={() => setIsSidebarOpen(false)}
          ></div>
          <div 
            className={`fixed top-24 left-0 h-[calc(100vh-6rem)] w-60 bg-black z-50 flex lg:hidden 
                        transition-transform duration-300 ease-in-out 
                        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
          >
            <SidebarContent onClose={() => setIsSidebarOpen(false)} />
          </div>
        </>
        
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default ProtectedLayout;