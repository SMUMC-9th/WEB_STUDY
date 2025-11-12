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
import { Pencil } from "lucide-react";

const HomePage = () => {
  const [order, setOrder] = useState<"desc" | "asc">("desc");
  const [openCreate, setOpenCreate] = useState(false);

  const {
    data,
    fetchNextPage,
    refetch,
    isFetching,
    hasNextPage,
    isLoading,
    isError,
    isFetchingNextPage,
  } = useGetLpList({ order });
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
      <OrderToggle order={order} onChange={setOrder} />

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
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
