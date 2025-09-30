import { getMyInfo } from "../apis/auth.ts";
import { useEffect, useState } from "react";
import type { responseMyInfoDto } from "../types/auth.ts";

const MyPage = () => {
  const [data, setData] = useState<responseMyInfoDto>();

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await getMyInfo();
        setData(response); // 서버 응답을 상태에 저장
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, []);
  return (
    <div>
      {data ? (
        <>
          {/*<p>{data?.name}</p>*/}
          {/*<p>{data?.email}</p>*/}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default MyPage;
