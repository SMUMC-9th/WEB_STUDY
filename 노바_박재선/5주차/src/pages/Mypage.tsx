//내 정보 조회

import { useEffect, useState } from "react";
import { getMyInfo } from "../apis/auth";
import { useAuth } from "../context/AuthContext";

const Mypage = () => {
    const {logout} = useAuth();
    const [data, setData] = useState<any>(null);

    //useEffect는 return문 먼저 실행된후에 나중에 실행됨
    useEffect(()=>{
        const getdata = async() => {
            const response = await getMyInfo();
            console.log(response);
            // getMyInfo returns CommonResponse<{...}> so take .data
            setData(response.data);
            console.log(response.data?.name);
        }

        getdata();
    },[]);
    const handleLogout = async() => {
        await logout();
    }
    
    return (
        <div>
            <h1>{data?.name}님 환영합니다</h1>
            {/* <img src={data?.profileImageUrl} alt="프로필 이미지" /> */}
            <h1>{data?.email}</h1>

            <button className="cursor-pointer w-30 rounded-md bg-[#ff349a] text-gray-100 p-2 mt-1" onClick={handleLogout}>로그아웃</button>
        </div>
    )

}

export default Mypage;