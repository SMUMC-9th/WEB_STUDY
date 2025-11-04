import { useEffect, useState } from "react";
import useGetInfiniteLpList from "../hooks/useGetInfiniteLpList.ts";
import { useInView } from "react-intersection-observer";
import LpCard from "../components/LpCard/LpCard.tsx";
import LpCardSkeletonList from "../components/LpCard/LpCardSkeletonList.tsx";
import { Plus } from "lucide-react";
import WriteModal from "../components/modal/WriteModal.tsx";

const HomePage = () => {
  const [search, setSearch] = useState("");
  const [order, setOrder] = useState<"desc" | "asc">("desc");
const [ismodalOpen, setIsModalOpen] = useState(false);

  const {
    data: lps,
    isFetching,
    hasNextPage,
    isPending,
    fetchNextPage,
    isError,
  } = useGetInfiniteLpList({ limit: 5, search, order });

  // ref: 특정한 HTML 요소 감지 가능
  // inView: 그 요소가 화면에 보이면 true
  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (inView && !isFetching && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);

  if (isError) return <div className="mt-10">Error occurred!</div>;

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex items-center justify-between gap-20 mb-10">
        {/* 검색창 */}
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="검색어를 입력하세요..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#3086d9] focus:border-transparent transition-all"
        />

        {/* 정렬 버튼 */}
        <div className="flex gap-2">
          <button
            onClick={() => setOrder("desc")}
            className="px-4 py-2 bg-[#3086d9] text-white rounded-lg hover:bg-[#256fb8] transition-all"
          >
            최신순
          </button>
          <button
            onClick={() => setOrder("asc")}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all"
          >
            오래된 순
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {isPending && <LpCardSkeletonList count={20} />}
        {lps?.pages
          ?.map((page) => page.data.data)
          ?.flat()
          ?.map((lp) => (
            <LpCard key={lp.id} lp={lp} />
          ))}

        {isFetching && <LpCardSkeletonList count={20} />}

        <div ref={ref} className="h-2"></div>
      </div>

      {/* 플로팅 버튼 */}
      <button
        onClick={()=> {setIsModalOpen(true)}}
        className="fixed bottom-8 right-8 w-50 h-14 rounded-full bg-[#3086d9] text-white shadow-lg flex items-center justify-center hover:bg-[#256fb8] transition-all"
      >
        <Plus />
      </button>
      {ismodalOpen && <WriteModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default HomePage;
