import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getMe, logout, updateMe } from "../api/auth";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";

export default function Mypage() {
  const { setIsLogged, login } = useAuth();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: user } = useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const res = await getMe();
      return res.data;
    },
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(user?.name || "");
  const [editBio, setEditBio] = useState(user?.bio || "");

  const updateProfileMutation = useMutation({
    mutationFn: async () => {
      return await updateMe({ name: editName, bio: editBio });
    },
    onMutate: () => {
      queryClient.setQueryData<{ data?: { name?: string; bio?: string } }>(
        ["me"],
        (oldData) => {
          if (!oldData) return { data: { name: editName, bio: editBio } };
          return {
            ...oldData,
            data: {
              ...oldData.data,
              name: editName,
              bio: editBio,
            },
          };
        }
      );
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
      login({ ...user!, name: editName });
      setIsEditing(false);
    },
  });

  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      localStorage.clear();
      setIsLogged(false);
      queryClient.clear();
      navigate("/");
    },
  });

  const handleSave = () => {
    if (!editName.trim()) return alert("이름을 입력해주세요!");
    updateProfileMutation.mutate();
  };

  return (
    <div className="max-w-3xl mx-auto p-6 mt-24">
      <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center text-center">
        <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-4 border-pink-400">
          <img
            src={user?.avatar}
            alt="avatar"
            className="w-full h-full object-cover"
          />
        </div>

        {isEditing ? (
          <div className="w-full flex flex-col items-center gap-3">
            <input
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 w-1/2 text-center focus:outline-pink-400"
              onKeyDown={(e) => e.key === "Enter" && handleSave()}
            />
            <textarea
              value={editBio}
              onChange={(e) => setEditBio(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 w-3/4 text-center focus:outline-pink-400"
              rows={3}
              placeholder="자기소개를 입력해주세요"
            />
            <div className="flex gap-3 mt-3">
              <button
                onClick={handleSave}
                className="bg-pink-500 hover:bg-pink-400 text-white py-2 px-5 rounded-lg"
              >
                저장
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-5 rounded-lg"
              >
                취소
              </button>
            </div>
          </div>
        ) : (
          <>
            <h1 className="text-2xl font-bold text-gray-800">{user?.name}</h1>
            <p className="text-gray-500">{user?.email}</p>
            {user?.bio && (
              <p className="mt-4 text-gray-600 text-center">{user.bio}</p>
            )}
            <p className="mt-4 text-sm text-gray-400">
              가입일: {new Date(user?.createdAt || "").toLocaleDateString()}
            </p>
            <div className="mt-6 flex gap-4">
              <button
                className="bg-pink-500 hover:bg-pink-400 text-white py-2 px-6 rounded-lg"
                onClick={() => {
                  setEditName(user?.name || "");
                  setEditBio(user?.bio || "");
                  setIsEditing(true);
                }}
              >
                프로필 수정
              </button>
              <button
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-6 rounded-lg"
                onClick={() => logoutMutation.mutate()}
              >
                로그아웃
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
