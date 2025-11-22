import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import type { ResponseMyInfoDto, RequestUpdateUserDto } from "../types/auth";
import { getMyInfo, updateUserInfo } from "../api/auth";
import { LOCAL_STORAGE_KEY } from "../constants/key";

const MyPage = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<ResponseMyInfoDto>();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<RequestUpdateUserDto>({
    name: "",
    bio: "",
    avatar: "",
  });

  // 내 정보 불러오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getMyInfo();
        setData(response);
        setFormData({
          name: response.data.name,
          bio: response.data.bio || "",
          avatar: response.data.avatar || "",
        });
      } catch (error) {
        console.error(error);
        alert("로그인이 필요합니다.");
        navigate("/login");
      }
    };
    fetchData();
  }, [navigate]);

  // 로그아웃
  const handleLogout = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY.accessToken);
    localStorage.removeItem(LOCAL_STORAGE_KEY.refreshToken);
    navigate("/");
  };

  // 회원정보 수정 Mutation
  const mutation = useMutation({
    mutationFn: (body: RequestUpdateUserDto) => updateUserInfo(body),
    onSuccess: (res) => {
      alert("정보가 성공적으로 수정되었습니다!");
      setData((prev) =>
        prev
          ? { ...prev, data: { ...prev.data, ...res.data } }
          : { data: res.data } as ResponseMyInfoDto
      );
      setIsEditing(false);
    },
    onError: () => {
      alert("수정 중 오류가 발생했습니다.");
    },
  });

  // 입력 변경 핸들러
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 수정 저장
  const handleSave = () => {
    if (!formData.name?.trim()) {
      alert("이름은 비워둘 수 없습니다.");
      return;
    }
    mutation.mutate(formData);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full gap-6 bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        {/* 헤더 */}
        <div className="flex items-center mb-6">
          <button
            onClick={() => navigate("/")}
            className="text-2xl hover:text-[#FF007F] transition-colors cursor-pointer"
          >
            &lt;
          </button>
          <h1 className="text-3xl font-bold text-center flex-1 text-[#FF007F]">
            마이페이지
          </h1>
          <button
            onClick={() => setIsEditing((prev) => !prev)}
            className="text-sm text-gray-600 hover:text-[#FF007F]"
          >
            {isEditing ? "취소" : "수정"}
          </button>
        </div>

        {/* 프로필 섹션 */}
        <div className="space-y-4">
          <div className="flex justify-center">
            <img
              src={formData.avatar || "/default-avatar.png"}
              alt="avatar"
              className="w-24 h-24 rounded-full border object-cover"
            />
          </div>

          {/* 수정 모드 */}
          {isEditing ? (
            <>
              <div>
                <p className="text-sm text-gray-500">이름</p>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border rounded-md px-3 py-2"
                />
              </div>

              <div>
                <p className="text-sm text-gray-500">Bio</p>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  className="w-full border rounded-md px-3 py-2"
                  placeholder="소개를 입력하세요 (선택사항)"
                />
              </div>

              <div>
                <p className="text-sm text-gray-500">프로필 이미지 URL</p>
                <input
                  type="text"
                  name="avatar"
                  value={formData.avatar}
                  onChange={handleChange}
                  className="w-full border rounded-md px-3 py-2"
                />
              </div>

              <button
                onClick={handleSave}
                className="w-full mt-4 px-4 py-3 bg-[#FF007F] text-white rounded-md hover:bg-pink-600 transition cursor-pointer"
                disabled={mutation.isPending}
              >
                {mutation.isPending ? "저장 중..." : "저장하기"}
              </button>
            </>
          ) : (
            <>
              <div className="border-b pb-3">
                <p className="text-sm text-gray-500">이름</p>
                <p className="text-xl font-semibold">{data?.data.name}</p>
              </div>

              <div className="border-b pb-3">
                <p className="text-sm text-gray-500">이메일</p>
                <p className="text-lg">{data?.data.email}</p>
              </div>

              <div className="border-b pb-3">
                <p className="text-sm text-gray-500">Bio</p>
                <p className="text-gray-700">
                  {data?.data.bio || "등록된 Bio가 없습니다."}
                </p>
              </div>
            </>
          )}
        </div>

        {/* 로그아웃 */}
        <button
          onClick={handleLogout}
          className="w-full mt-6 px-4 py-3 bg-red-500 text-white rounded-md hover:bg-red-600 transition cursor-pointer"
        >
          로그아웃
        </button>
      </div>
    </div>
  );
};

export default MyPage;
