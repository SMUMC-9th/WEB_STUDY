//내 정보 조회

import { useEffect, useState } from "react";
import { getMyInfo } from "../apis/auth";

const Mypage = () => {
    const [data, setData] =  useState([]);

    useEffect(()=>{
        const getdata = async() => {
            const response = await getMyInfo();
            console.log(response);
            setData(response);
        }

        getdata();
    },[])
    return (
        <div>
            {data.name}
        </div>
    )

}

export default Mypage;