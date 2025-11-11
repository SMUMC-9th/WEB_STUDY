import { useEffect, useState } from "react";
import { useDebounce } from "../hooks/useDebounce";
import { axiosInstance } from "../api/axiosInstance";
import LpCard from "../components/LpCard";

interface Lp {
  id: number;
  title: string;
  content: string;
  thumbnail: string;
  createdAt: string;
  tags: { id: number; name: string }[];
  likes: { id: number; userId: number; lpId: number }[];
}

export default function Search() {
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState<Lp[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const debouncedKeyword = useDebounce(keyword, 300);

  const fetchTagLps = async (searchTerm: string) => {
    if (!searchTerm.trim()) {
      setResults([]);
      return;
    }

    try {
      setIsLoading(true);

      const response = await axiosInstance.get(`/v1/lps/tag/${searchTerm}`, {
        params: {
          cursor: 0,
          limit: 10,
          order: "desc",
        },
      });

      const lpList = response.data?.data?.data || [];
      setResults(lpList);
    } catch (error) {
      console.error("태그 LP 목록 조회 실패:", error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (debouncedKeyword) {
      fetchTagLps(debouncedKeyword);
    } else {
      setResults([]);
    }
  }, [debouncedKeyword]);

  return (
    <div className="max-w-4xl mx-auto p-6 text-white mt-20">
      <h1 className="text-2xl font-semibold mb-4">#LP 태그 검색</h1>

      <input
        type="text"
        placeholder="검색할 태그명을 입력하세요..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        className="w-full border border-gray-500 bg-transparent rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-400"
      />

      {isLoading ? (
        <p className="mt-6 text-gray-500">불러오는 중...</p>
      ) : results.length > 0 ? (
        <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-6">
          {results.map((lp) => (
            <LpCard
              key={lp.id}
              id={lp.id}
              title={lp.title}
              thumbnail={lp.thumbnail}
              createdAt={lp.createdAt}
              likes={lp.likes}
            />
          ))}
        </div>
      ) : debouncedKeyword ? (
        <p className="mt-6 text-gray-500">검색 결과가 없습니다.</p>
      ) : (
        <p className="mt-6 text-gray-500">태그명을 입력해 검색해보세요.</p>
      )}
    </div>
  );
}
