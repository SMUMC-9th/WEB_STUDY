import { useQuery } from "@tanstack/react-query";
import { getMe } from "../api/auth";
import { useAuth } from "../context/auth";

export default function Mypage() {
  const { logout } = useAuth();
  const { data: user } = useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const res = await getMe();
      console.log(res);
      return res.data;
    },
  });

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
        <h1 className="text-2xl font-bold text-gray-800">{user?.name}</h1>
        <p className="text-gray-500">{user?.email}</p>
        {user?.bio && (
          <p className="mt-4 text-gray-600 text-center">{user.bio}</p>
        )}
        <p className="mt-4 text-sm text-gray-400">
          가입일: {new Date(user?.createdAt || "").toLocaleDateString()}
        </p>
        <div className="mt-6 flex gap-4">
          <button className="bg-pink-500 hover:bg-pink-400 text-white py-2 px-6 rounded-lg">
            프로필 수정
          </button>
          <button
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-6 rounded-lg"
            onClick={logout}
          >
            로그아웃
          </button>
        </div>
      </div>
    </div>
  );
}
