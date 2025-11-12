import { useEffect, useState } from "react";
import { getMyInfo } from "../apis/auth.ts";
import { type ResponseMyInfoDto } from "../types/authType.ts";
import { useAuth } from "../context/AuthContext.tsx";
import { useNavigate } from "react-router-dom";
import useUpdateMyInfo from "../hooks/mutations/useUpdateMyInfo";
import { Pencil, LogOut, CircleCheck, CircleX } from "lucide-react";

const MyPage = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const [data, setData] = useState<ResponseMyInfoDto | null>(null);
  const [loading, setLoading] = useState(true);

  const [isEdit, setIsEdit] = useState(false);
  const [formName, setFormName] = useState("");
  const [formAvatar, setFormAvatar] = useState("");
  const [formBio, setFormBio] = useState("");

  const { mutate: updateMe, isPending } = useUpdateMyInfo();

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

  const user = data?.data;

  useEffect(() => {
    if (isEdit && user) {
      setFormName(user.name ?? "");
      setFormAvatar(user.avatar ?? "");
      setFormBio(user.bio ?? "");
    }
  }, [isEdit, user]);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const handleSave = () => {
    if (!user) return;
    if (!formName.trim()) {
      alert("이름을 입력해 주세요.");
      return;
    }

    updateMe(
      { name: formName.trim(), avatar: formAvatar.trim(), bio: formBio.trim() },
      {
        onSuccess: (server) => {
          setData(server);
          setIsEdit(false);
        },
        onError: () => {
          alert("프로필 저장에 실패했습니다. 다시 시도해 주세요.");
        },
      }
    );
  };

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
      <div className="bg-white shadow-md rounded-2xl p-10 w-full max-w-md flex flex-col items-center gap-2 border border-gray-100 relative">
        <div className="absolute top-3 right-3 z-10 flex items-center gap-3">
          {!isEdit ? (
            <>
              <button
                onClick={() => setIsEdit(true)}
                className="text-gray-500 text-xs cursor-pointer hover:text-gray-800"
                disabled={isPending}
                aria-label="프로필 수정"
              >
                <Pencil />
              </button>
              <button
                onClick={handleLogout}
                className="text-gray-500 text-xs cursor-pointer hover:text-gray-800"
                disabled={isPending}
                aria-label="로그아웃"
              >
                <LogOut />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleSave}
                disabled={isPending}
                className="text-gray-500 text-xs cursor-pointer hover:text-gray-800"
                aria-label="저장"
              >
                <CircleCheck />
              </button>
              <button
                onClick={() => {
                  setFormName(user.name ?? "");
                  setFormAvatar(user.avatar ?? "");
                  setFormBio(user.bio ?? "");
                  setIsEdit(false);
                }}
                disabled={isPending}
                className="text-gray-500 text-xs cursor-pointer hover:text-gray-800"
                aria-label="취소"
              >
                <CircleX />
              </button>
            </>
          )}
        </div>

        <img
          src={
            isEdit
              ? formAvatar ||
                "https://i.pinimg.com/736x/ee/5c/aa/ee5caacd1bb467e148a0bd25ce464dd0.jpg"
              : user.avatar ||
                "https://i.pinimg.com/736x/ee/5c/aa/ee5caacd1bb467e148a0bd25ce464dd0.jpg"
          }
          alt="프로필 이미지"
          className="w-28 h-28 rounded-full object-cover"
        />

        {/* 이름 / 이메일 */}
        <div className="w-full">
          {isEdit ? (
            <div className="space-y-2">
              <label className="block text-xs text-gray-500">이름</label>
              <input
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-400"
                placeholder="이름을 입력하세요"
                disabled={isPending}
              />
            </div>
          ) : (
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
              <p className="text-gray-500 text-sm">{user.email}</p>
            </div>
          )}
        </div>

        {/* 프로필 이미지 URL */}
        <div className="w-full">
          {isEdit && (
            <div className="space-y-2">
              <label className="block text-xs text-gray-500">
                프로필 이미지 URL
              </label>
              <input
                value={formAvatar}
                onChange={(e) => setFormAvatar(e.target.value)}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-400"
                placeholder="https://example.com/avatar.png"
                disabled={isPending}
              />
            </div>
          )}
        </div>

        {/* 소개 */}
        <div className="w-full">
          {isEdit ? (
            <div className="space-y-2">
              <label className="block text-xs text-gray-500">소개</label>
              <textarea
                value={formBio}
                onChange={(e) => setFormBio(e.target.value)}
                className="w-full min-h-[90px] rounded-md border border-gray-300 px-3 py-2 text-sm outline-none resize-none focus:border-gray-400"
                placeholder="자기소개를 입력하세요"
                disabled={isPending}
              />
            </div>
          ) : (
            <p className="text-gray-600 text-center text-sm italic mb-5">
              {user.bio ? user.bio : "자기소개가 없습니다."}
            </p>
          )}
        </div>

        {!isEdit && (
          <div className="w-full border-t border-gray-200 pt-4 text-xs text-gray-500 text-center space-y-1">
            <p>가입일 : {new Date(user.createdAt).toLocaleDateString()}</p>
            <p>최근 수정일 : {new Date(user.updatedAt).toLocaleDateString()}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyPage;
