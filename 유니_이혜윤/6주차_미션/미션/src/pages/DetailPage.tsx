import useGetLpComments from "../hooks/useGetComments";
import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import type { TLP, CommentListDto, CLP } from "../types/lp";
import { OrderToggle } from "../components";

const DetailPage = () => {
  const param = useParams();
  const lpId = Number(param.lpId);
  const location = useLocation() as { state?: { lp?: TLP } };
  const [lp, setLp] = useState<TLP | undefined>(location.state?.lp);

  const { ref, inView } = useInView({ threshold: 0 });
  const [order, setOrder] = useState<"desc" | "asc">("desc");

  const { data, fetchNextPage, refetch, isFetching, hasNextPage } =
    useGetLpComments({ lpId, order });

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

  return (
    <div className="p-3">
      {lp && (
        <div className="mb-4 rounded-md overflow-hidden shadow">
          <div className="relative">
            <img
              src={lp.thumbnail}
              alt={lp.title}
              className="w-full h-100 object-cover"
            />
            <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/20 p-3">
              <h1 className="text-white font-semibold text-base line-clamp-2">
                {lp.title}
              </h1>
              <div className="flex justify-between items-center text-xs text-gray-200 mt-1">
                <span>
                  {new Date(lp.createdAt).toLocaleDateString("ko-KR", {
                    year: "2-digit",
                    month: "2-digit",
                    day: "2-digit",
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-end mb-2">
        <OrderToggle order={order} onChange={setOrder} />
      </div>

      <div className="flex-1 flex flex-col gap-2">
        <textarea
          className="w-full min-h-[60px] mb-2 p-2 text-sm border border-gray-300 rounded-md outline-none resize-none"
          placeholder="댓글을 입력하세요..."
        />
      </div>

      {data?.pages.map((comments: CommentListDto) =>
        comments.data.data.map((comment: CLP) => (
          <div
            key={comment.id}
            className="flex gap-3 mb-3 p-3 rounded-lg bg-white"
          >
            <img
              src={comment.author.avatar}
              alt={comment.author.name}
              className="w-10 h-10 rounded-full object-cover border border-gray-200"
            />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    {comment.author.name}
                  </p>
                  <p className="text-[11px] text-gray-400">
                    {new Date(comment.createdAt).toLocaleDateString("ko-KR", {
                      year: "2-digit",
                      month: "2-digit",
                      day: "2-digit",
                    })}
                  </p>
                </div>
              </div>

              <p className="mt-2 text-sm text-gray-700 leading-relaxed">
                {comment.content}
              </p>
            </div>
          </div>
        ))
      )}

      <div className="w-full flex justify-center mt-5 min-h-6" ref={ref}>
        {hasNextPage && <span>로딩중...</span>}
      </div>
    </div>
  );
};

export default DetailPage;
