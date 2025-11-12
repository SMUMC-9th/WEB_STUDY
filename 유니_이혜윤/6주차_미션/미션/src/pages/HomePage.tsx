import { useEffect, useState } from "react";
import useGetLpList from "../hooks/useGetLpList";
import { useInView } from "react-intersection-observer";
import {
  LpCard,
  LpCardSkeletonList,
  OrderToggle,
  LpCreateModal,
} from "../components";
import type { CreateLpRequest } from "../types/lp";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createLp } from "../apis/lp";
import { QUERY_KEY } from "../constants/key";
import { Pencil, Search } from "lucide-react";
import { useDebounce } from "../hooks/useDebounce";

const HomePage = () => {
  const [order, setOrder] = useState<"desc" | "asc">("desc");
  const [openCreate, setOpenCreate] = useState(false);
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search, 300);

  const {
    data,
    fetchNextPage,
    refetch,
    isFetching,
    hasNextPage,
    isLoading,
    isError,
    isFetchingNextPage,
  } = useGetLpList({ order, search: debouncedSearch });
  const { ref, inView } = useInView({ threshold: 0 });

  useEffect(() => {
    if (inView && hasNextPage && !isFetching) fetchNextPage();
  }, [inView, fetchNextPage, isFetching, hasNextPage]);

  useEffect(() => {
    refetch();
  }, [order, refetch]);

  const queryClient = useQueryClient();
  const { mutate: createMutate } = useMutation({
    mutationFn: (body: CreateLpRequest) => createLp(body),
    onSuccess: () => {
      setOpenCreate(false);
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.lps, order] });
    },
    onError: () => {
      alert("Lp 생성에 실패했습니다.");
    },
  });

  const handleCreate = (form: {
    title: string;
    content: string;
    thumbnail: string;
    tags: string[];
    published: boolean;
  }) => {
    createMutate(form);
  };

  if (isError) return <div>Error..</div>;

  return (
    <div className="h-full bg-gray-50 p-5">
      <div className="flex justify-between">
        <div className="relative w-60">
          <Search className="absolute left-2 top-4 -translate-y-1/2 text-gray-400 w-4 h-4" />

          <input
            className="w-full pl-7 pr-2 py-1 border border-gray-400 rounded outline-none"
            placeholder="검색어를 입력하세요"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <OrderToggle order={order} onChange={setOrder} />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mt-5">
        {!data && isLoading && <LpCardSkeletonList count={20} />}

        {data?.pages.map((lps) =>
          lps.data.data.map((lp) => <LpCard key={lp.id} lp={lp} />)
        )}

        {isFetchingNextPage && <LpCardSkeletonList count={12} />}
      </div>

      <div className="w-full flex justify-center mt-5 min-h-6" ref={ref}>
        {isFetchingNextPage && hasNextPage && <span>로딩중...</span>}
      </div>

      <button
        onClick={() => setOpenCreate(true)}
        className="fixed bottom-5 left-5 z-50 h-12 w-12 rounded-full
                   shadow-xl text-white text-2xl bg-black cursor-pointer
                   active:scale-95 pl-3"
        aria-label="LP 생성"
        title="LP 생성"
      >
        <Pencil />
      </button>

      <LpCreateModal
        open={openCreate}
        onClose={() => setOpenCreate(false)}
        onSubmit={handleCreate}
      />
    </div>
  );
};

export default HomePage;
