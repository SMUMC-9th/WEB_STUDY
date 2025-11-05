import { getMyInfo, patchMyInfo } from "../apis/auth.ts";
import { useEffect, useState } from "react";
import type { ChangeEvent } from "react";
import type { responseMyInfoDto } from "../types/auth.ts";
import { Settings, Mail, Check, X } from "lucide-react";
import usePostAuthImage from "../hooks/mutations/lps/usePostAuthImage.ts";
import useDeleteUser from "../hooks/mutations/user/useDeleteUser.ts";
import {useNavigate} from "react-router-dom";

const MyPage = () => {
  const [data, setData] = useState<responseMyInfoDto>();
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState("");

  // const[ismodalOpen, setIsmodalOpen] = useState(false);
  const { mutate: uploadImage } = usePostAuthImage();

  // 회원 탈퇴
  const {mutate: deleteUserMutate} = useDeleteUser();

  const navigate = useNavigate();

  // 내 정보 가져오기
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await getMyInfo();
        setData(response);
        setName(response.data.name);
        setBio(response.data.bio || "");
        setAvatar(response.data.avatar || "");
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, []);

  // 프로필 이미지 변경
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) return;
    const formData = new FormData();
    formData.append("file", e.target.files[0]);

    uploadImage(formData, {
      onSuccess: (res) => {
        setAvatar(res.data.imageUrl);
        alert("프로필 이미지 업로드 완료");
      },
      onError: () => alert("이미지 업로드 실패"),
    });
  };

  // 수정 완료
  const handleSave = async () => {
    try {
      await patchMyInfo({ name, bio, avatar });
      alert("프로필 수정 완료!");
      setEditMode(false);
      const updated = await getMyInfo();
      setData(updated);
    } catch (error) {
      console.error("수정 실패:", error);
      alert("수정 중 오류가 발생했습니다.");
    }
  };

  if (!data) {
    return (
      <div className="flex justify-center items-center h-32">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl relative">
      {/* 설정 버튼 */}
      {!editMode ? (
        <button
          onClick={() => setEditMode(true)}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
        >
          <Settings size={20} />
        </button>
      ) : (
        <div className="absolute top-4 right-4 flex gap-2">
          <button
            onClick={handleSave}
            className="text-green-600 hover:text-green-700"
          >
            <Check size={20} />
          </button>
          <button
            onClick={() => setEditMode(false)}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={20} />
          </button>
        </div>
      )}

      {/* 프로필 */}
      <div className="flex items-center space-x-4 mb-4">
        <div className="relative">
          <img
            src={avatar || "/default-avatar.png"}
            alt="User Avatar"
            className="w-20 h-20 rounded-full border-2 border-gray-200 shadow-sm object-cover"
          />
          {editMode && (
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="absolute bottom-0 left-0 w-full opacity-0 cursor-pointer h-full"
              title="프로필 이미지 변경"
            />
          )}
        </div>

        <div>
          {editMode ? (
            <>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border border-gray-300 rounded-md px-2 py-1 w-full text-gray-800 text-lg font-semibold"
              />
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="border border-gray-300 rounded-md px-2 py-1 mt-1 w-full text-gray-600 text-sm resize-none"
                placeholder="자기소개 입력"
              />
            </>
          ) : (
            <>
              <p className="text-2xl font-bold text-gray-800">
                {data.data.name}
              </p>
              <p className="text-sm text-gray-500 mt-1">{data.data.bio}</p>
            </>
          )}
        </div>
      </div>

      {/* 이메일 */}
      <div className="flex items-center pt-4 border-t border-gray-200 space-x-2">
        <Mail size={16} className="text-gray-400" />
        <p className="text-md text-gray-700">{data.data.email}</p>
      </div>

      <button onClick={() => {
        alert('정말 탈퇴하겠습니까?');
        deleteUserMutate();
        navigate('/');
      }}>
        탈퇴하기
      </button>
    </div>
  );
};

export default MyPage;
