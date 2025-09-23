import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Movie } from "../types/movie";
import { Star } from "lucide-react";

export default function Detail() {
  const { id } = useParams();
  const [detail, setDetail] = useState<Movie | null>(null);
  const [isPending, setIsPending] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (!id) return;
    const fetchDetail = async () => {
      setIsPending(true);
      setIsError(false);
      try {
        const { data } = await axios.get<Movie>(
          `https://api.themoviedb.org/3/movie/${id}?language=ko-KR`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
            },
          }
        );
        setDetail(data);
      } catch (error) {
        console.error(error);
        setIsError(true);
      } finally {
        setIsPending(false);
      }
    };
    fetchDetail();
  }, [id]);

  if (isError) {
    return (
      <div className="h-dvh flex justify-center items-center">
        <span className="text-red-500 text-2xl whitespace-pre-line">
          에러가 발생했습니다. <br />
          다시 시도해주세요.
        </span>
      </div>
    );
  }

  if (isPending || !detail) {
    return (
      <div className="h-dvh flex justify-center items-center">
        <span className="text-white text-2xl">로딩 중...</span>
      </div>
    );
  }

  const date = detail.release_date.split("-")[0];
  const posterUrl = `https://image.tmdb.org/t/p/w500${detail.poster_path}`;
  const backdropUrl = `https://image.tmdb.org/t/p/original${detail.backdrop_path}`;
  const rating = detail.vote_average.toFixed(1);

  return (
    <div
      className="relative text-white h-[60vh] flex items-center"
      style={{
        backgroundImage: `url(${backdropUrl || posterUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />

      <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-8 p-8">
        <img
          src={posterUrl}
          alt={detail.title}
          className="w-64 rounded-xl shadow-lg"
        />

        <div className="max-w-2xl">
          <h1 className="text-4xl font-extrabold mb-4">{detail.title}</h1>

          <div className="flex items-center gap-4 text-gray-300 mb-4">
            <span>{date}</span>
            <span>·</span>
            <span>{detail.runtime}분</span>
          </div>

          <div className="flex items-center gap-2 mb-6">
            <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
            <span className="text-xl font-semibold">{rating}</span>
            <span className="text-gray-400">/ 10</span>
          </div>

          <p className="text-gray-200 leading-relaxed">{detail.overview}</p>
        </div>
      </div>
    </div>
  );
}
