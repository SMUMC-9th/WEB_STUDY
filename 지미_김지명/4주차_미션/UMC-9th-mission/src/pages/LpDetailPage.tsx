import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getLpDetail } from "../api/lp";

const LpDetailPage = () => {
  const { lpId } = useParams<{ lpId: string }>();
  const navigate = useNavigate();

  const { data, isPending, isError } = useQuery({
    queryKey: ["lp", lpId],
    queryFn: () => getLpDetail(Number(lpId)),
    enabled: !!lpId,
  });

  if (isPending) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-black">
        <div className="text-white text-2xl">Loading...</div>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-black">
        <div className="text-white text-2xl">LP를 찾을 수 없습니다.</div>
      </div>
    );
  }

  const lp = data.data;

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        {/* 뒤로가기 버튼 */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition"
        >
          ← 뒤로가기
        </button>

        {/* 썸네일 */}
        <img
          src={lp.thumbnail}
          alt={lp.title}
          className="w-full h-96 object-cover rounded-lg mb-6"
        />

        {/* 제목 */}
        <h1 className="text-4xl font-bold mb-4">{lp.title}</h1>

        {/* 작성자 & 날짜 */}
        <div className="flex items-center gap-4 mb-6 text-gray-400">
          <span>{lp.author.name}</span>
          <span>{new Date(lp.createdAt).toLocaleDateString()}</span>
          <span>{lp.likes.length} 좋아요</span>
        </div>

        {/* 태그 */}
        {lp.tags.length > 0 && (
          <div className="flex gap-2 mb-6">
            {lp.tags.map((tag) => (
              <span
                key={tag.id}
                className="px-3 py-1 bg-[#FF007F] bg-opacity-20 text-[#FF007F] rounded-full text-sm"
              >
                #{tag.name}
              </span>
            ))}
          </div>
        )}

        {/* 내용 */}
        <div className="bg-gray-900 p-6 rounded-lg">
          <p className="text-lg leading-relaxed whitespace-pre-wrap">{lp.content}</p>
        </div>

        {/* 작성자 정보 */}
        <div className="mt-8 p-6 bg-gray-900 rounded-lg">
          <h2 className="text-xl font-bold mb-4">작성자 정보</h2>
          <div className="flex items-center gap-4">
            {lp.author.avatar ? (
              <img
                src={lp.author.avatar}
                alt={lp.author.name}
                className="w-16 h-16 rounded-full"
              />
            ) : (
              <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center text-2xl">
                👤
              </div>
            )}
            <div>
              <p className="font-bold">{lp.author.name}</p>
              <p className="text-gray-400">{lp.author.email}</p>
              {lp.author.bio && <p className="text-sm mt-1">{lp.author.bio}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LpDetailPage;