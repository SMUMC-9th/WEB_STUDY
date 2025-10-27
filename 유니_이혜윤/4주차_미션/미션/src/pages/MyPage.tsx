import { useEffect, useState } from "react";
import { getMyInfo } from "../apis/auth.ts";
import { type ResponseMyInfoDto } from "../types/authType.ts";
import { useAuth } from "../context/AuthContext.tsx";
import { useNavigate } from "react-router-dom";

const MyPage = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [data, setData] = useState<ResponseMyInfoDto | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await getMyInfo();
        setData(response);
      } catch (error) {
        console.error("내 정보 불러오기 실패:", error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const user = data?.data;

  if (loading)
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        로딩 중...
      </div>
    );

  if (!user)
    return (
      <div className="flex items-center justify-center h-full text-red-400">
        유저 정보를 불러올 수 없습니다 😢
      </div>
    );

  return (
    <div className="flex flex-col items-center justify-center h-full bg-gray-50 py-10 px-6">
      <div className="bg-white shadow-md rounded-2xl p-8 w-full max-w-md flex flex-col items-center gap-6 border border-gray-100">
        <img
          src={
            user?.avatar
              ? user.avatar
              : "https://i.pinimg.com/736x/ee/5c/aa/ee5caacd1bb467e148a0bd25ce464dd0.jpg"
          }
          alt="프로필 이미지"
          className="w-28 h-28 rounded-full object-cover"
        />

        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-1">{user.name}</h2>
          <p className="text-gray-500 text-sm">{user.email}</p>
        </div>

        <p className="text-gray-600 text-center text-sm italic">
          {user.bio ? user.bio : "자기소개가 없습니다."}
        </p>

        <div className="w-full border-t border-gray-200 pt-4 text-xs text-gray-500 text-center space-y-1">
          <p>가입일 : {new Date(user.createdAt).toLocaleDateString()}</p>
          <p>최근 수정일 : {new Date(user.updatedAt).toLocaleDateString()}</p>
        </div>
        <button
          onClick={handleLogout}
          className="bg-[#acacac] p-1 text-xs rounded cursor-pointer"
        >
          로그아웃
        </button>
      </div>
    </div>
  );
};

export default MyPage;
