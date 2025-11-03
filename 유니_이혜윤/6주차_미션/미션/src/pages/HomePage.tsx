import { useEffect, useState } from "react";
import useGetLpList from "../hooks/useGetLpList";
import { useInView } from "react-intersection-observer";
import { LpCard, LpCardSkeletonList, OrderToggle } from "../components";

const HomePage = () => {
  const [order, setOrder] = useState<"desc" | "asc">("desc");
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
    if (inView) {
      if (hasNextPage && !isFetching) {
        fetchNextPage();
      }
    }
  }, [inView, fetchNextPage, isFetching, hasNextPage]);

  useEffect(() => {
    refetch();
  }, [order, refetch]);

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
    </div>
  );
};

export default HomePage;
