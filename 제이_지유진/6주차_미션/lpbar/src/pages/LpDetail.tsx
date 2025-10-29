import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchLPById } from "../api/lp";
import SkeletonCard from "../components/SkeletonCard";
import type { LP } from "../types/lp";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";
import { Heart, Edit2, Trash2 } from "lucide-react";
import { useAuth } from "../context/auth";
import CommentDetail from "../components/CommentDetail";

dayjs.extend(relativeTime);
dayjs.locale("ko"); //이거 지림

export default function LpDetail() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const {
    data: lp,
    isLoading,
    isError,
    refetch,
  } = useQuery<LP>({
    queryKey: ["lp", id],
    queryFn: () => fetchLPById(Number(id)),
    staleTime: 1000 * 60,
    retry: 1,
  });

  if (isLoading) {
    return (
      <div className="p-10 flex justify-center bg-gray-900 min-h-screen">
        <SkeletonCard />
      </div>
    );
  }

  if (isError || !lp) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-red-400 mb-4 text-lg">
          데이터를 불러오지 못했습니다.
        </p>
        <button
          className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
          onClick={() => refetch()}
        >
          재시도
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="flex flex-col max-w-3xl mx-auto bg-[#272A30] rounded-lg shadow-lg p-15">
        {/* 작성자 정보 */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <img
              src={lp.author.avatar}
              alt={lp.author.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <span className="text-white font-medium">{lp.author.name}</span>
          </div>
          <span className="text-gray-400 text-sm">
            {dayjs(lp.createdAt).fromNow()}
          </span>
        </div>
        <div>
          <div className="flex items-center justify-between mb-12">
            <h1 className="text-md text-white text-left">{lp.title}</h1>

            {user?.id === lp.author.id && (
              <div className="flex items-center gap-2">
                <Edit2
                  size={20}
                  className="text-gray-300 hover:text-blue-400 cursor-pointer transition-colors"
                />
                <Trash2
                  size={20}
                  className="text-gray-300 hover:text-red-500 cursor-pointer transition-colors"
                />
              </div>
            )}
          </div>

          <div className="relative w-full flex justify-center items-center mb-12 py-8">
            <div className="absolute w-90 h-90 bg-[#272A30] shadow-[0_20px_50px_rgba(0,0,0,0.7)]"></div>

            <div className="relative w-80 h-80 rounded-full overflow-hidden border-4 border-gray-500 shadow-xl animate-spin-slow">
              <img
                src={lp.thumbnail}
                alt={lp.title}
                className="w-full h-full object-cover"
              />

              <div className="absolute top-1/2 left-1/2 w-20 h-20 -translate-x-1/2 -translate-y-1/2 bg-gray-900 rounded-full shadow-lg border-2 border-gray-700">
                <div className="absolute top-1/2 left-1/2 w-3 h-3 -translate-x-1/2 -translate-y-1/2 bg-black rounded-full"></div>
              </div>
            </div>
          </div>

          <p className="text-gray-300 text-left leading-relaxed">
            {lp.content}
          </p>
          {lp.tags && lp.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {lp.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-700 text-gray-300 text-sm rounded-full"
                >
                  {`#${String(tag)}`}
                </span>
              ))}
            </div>
          )}

          <div className="flex items-center justify-center gap-3">
            <div className="flex items-center gap-2 bg-gray-700 px-6 py-3 rounded-full">
              <Heart className="fill-red-500 text-red-500" size={20} />
              <span className="font-medium text-white">{lp.likes.length}</span>
            </div>
          </div>
          <CommentDetail />
        </div>
      </div>

      <style>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </div>
  );
}
