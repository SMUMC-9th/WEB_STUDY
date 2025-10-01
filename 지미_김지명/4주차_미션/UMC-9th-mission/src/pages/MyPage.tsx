import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { ResponseMyInfoDto } from "../types/auth.ts";
import { getMyInfo } from "../api/auth.ts";
import { LOCAL_STORAGE_KEY } from "../constants/key";

const MyPage = () => {
    const navigate = useNavigate();
    const [data, setData] = useState<ResponseMyInfoDto>();

    useEffect(() => {
        const getData = async () => {
            try {
                const response: ResponseMyInfoDto = await getMyInfo();
                console.log(response);
                setData(response);
            } catch (error) {
                console.error(error);
                alert("로그인이 필요합니다.");
                navigate('/login');
            }
        };

        getData();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem(LOCAL_STORAGE_KEY.accessToken);
        navigate('/');
    };

    return (
        <div className="flex flex-col items-center justify-center h-full gap-6 bg-gray-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                <h1 className="text-3xl font-bold text-center mb-6 text-[#FF007F]">마이페이지</h1>
                
                <div className="space-y-4">
                    <div className="border-b pb-3">
                        <p className="text-sm text-gray-500">이름</p>
                        <p className="text-xl font-semibold">{data?.data.name}</p>
                    </div>
                    
                    <div className="border-b pb-3">
                        <p className="text-sm text-gray-500">이메일</p>
                        <p className="text-lg">{data?.data.email}</p>
                    </div>
                </div>

                <button
                    onClick={handleLogout}
                    className="w-full mt-6 px-4 py-3 bg-red-500 text-white rounded-md hover:bg-red-600 transition cursor-pointer">
                    로그아웃
                </button>
            </div>
        </div>
    );
};

export default MyPage;