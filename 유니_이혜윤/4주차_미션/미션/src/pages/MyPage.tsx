import { getMyInfo } from "../apis/auth.ts";
import { useEffect, useState } from "react";
import type { ResponseMyInfoDto } from "../types/authType.ts";

const MyPage = () => {
  const [data, setData] = useState<ResponseMyInfoDto>();

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await getMyInfo();
        setData(response);
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, []);
  return <div>{data ? <>데이터 들어옴 !!</> : <p>데이터 안들어옴 ㅠ</p>}</div>;
};

export default MyPage;
