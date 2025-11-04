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

  const handleLogout = () => {
    localStorage.removeItem("accessToken"); // 저장된 토큰 삭제
    window.location.href = "/signin"; // 로그인 페이지로 이동
  };

  return (
    <div>
      {data ? (
        <>
          <dl className="flex flex-col">
            <div className="flex">
              <dt>닉네임</dt>
              <dd>{data?.data.name}</dd>
            </div>
            <div className="flex">
              <dt>이메일</dt>
              <dd>{data?.data.email}</dd>
            </div>
          </dl>

          <button
            onClick={handleLogout}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            로그아웃
          </button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default MyPage;
