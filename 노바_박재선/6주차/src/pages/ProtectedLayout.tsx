import { Outlet, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { getMyInfo, postLogout } from "../apis/auth";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import { set } from "zod";
import { LogOut } from "lucide-react";


const Sidebar = () => {
    return (
        <aside className="w-60 bg-black p-6 flex flex-col justify-between">
            <div>
                <h1 className="text-3xl font-bold mb-8 text-left">DOLIGO</h1>
                <nav className="space-y-4">
                    <a 
                        href="#"
                        className="flex items-center space-x-3 p-2 rounded-md text-gray-400 hover:text-white hover:bg-neutral-800"
                    >
                        <span className="text-lg">🔎 찾기</span>
                    </a>
                    <a 
                        href="/mypage"
                        className="flex items-center space-x-3 p-2 rounded-md text-white bg-neutral-800 font-bold"
                    >
                        <span className="text-lg">🕵🏻‍♀️ 마이페이지</span>
                    </a>
                </nav>
            </div>
            <div>
                <a href="#" className="text-sm text-gray-500 hover:text-white">
                    탈퇴하기
                </a>
            </div>
        </aside>
    )
}


const ProtectedLayout = () => {
    const nav = useNavigate();
    const {accessToken, logout} = useAuth();
    const [userName, setUserName] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(()=> {
        const fetchUserInfo = async () => {
            if(accessToken) {
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
        await logout();
        nav('/');
    }

    return (
        <div className="flex min-h-screen bg-neutral-900 text-white">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <header className="flex justify-end items-center p-6 h-20 bg-neutral-900">
                    {isLoading ? (
                        <div className="flex items-center text-sm">로딩중...</div>
                    ): userName ? (
                        <div className="flex items-center space-x-4">
                            <span className="text-white">
                                {userName}님 반갑습니다.
                            </span>
                            <button
                                onClick={handleLogout}
                                className="text-gray-400 hover:text-white"
                            >
                                로그아웃
                            </button>
                        </div>
                    ) : (
                        <div className="text-white">
                            로그인 정보 없음
                        </div>
                    )}
                </header>
                <main className="flex-1 p-8 overflow-auto">
                    <Outlet />
                </main>
            </div>
            <button
                className="fixed bottom-10 right-10 w-16 h-16 bg-pink-600 rounded-full flex items-center justify-center text-white text-4xl font-light shadow-lg hover:bg-pink-700 transition-colors"
                aria-label="새 LP 추가"
            >
                +
            </button>
        </div>

    )
}



export default ProtectedLayout;