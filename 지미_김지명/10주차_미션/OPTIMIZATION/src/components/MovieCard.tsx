import { memo } from "react";
import type { Movie } from "../types/movie";

interface MovieCardProps {
  movie: Movie;
  onClick?: () => void;
}

// 최적화: 상수를 컴포넌트 외부로 이동 (매 렌더링마다 재생성 방지)
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
const FALLBACK_IMAGE = "http://via.placeholder.com/640x480";

const MovieCard = ({ movie, onClick }: MovieCardProps) => {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer overflow-hidden rounded-lg bg-white shadow-md transition-all hover:shadow-lg"
    >
      <div className="relative h-80 overflow-hidden">
        <img
          src={
            movie.poster_path
              ? `${IMAGE_BASE_URL}${movie.poster_path}`
              : FALLBACK_IMAGE
          }
          alt={`${movie.title} 포스터`}
          className="h-full w-full object-cover transition-transform duration-300 ease-in-out hover:scale-105"
        />
        <div className="absolute right-2 top-2 rounded-md bg-black px-2 py-1 text-sm font-bold text-white">
          {movie.vote_average.toFixed(1)}
        </div>
      </div>
      <div className="p-4">
        <h3 className="mb-2 text-lg font-bold text-gray-800">{movie.title}</h3>
        <p className="text-sm text-gray-600">
          {movie.release_date} | {movie.original_language.toUpperCase()}
        </p>
        <p className="mt-2 text-sm text-gray-700">
          {movie.overview.length > 100
            ? `${movie.overview.slice(0, 100)}...`
            : movie.overview}
        </p>
      </div>
    </div>
  );
};

// 최적화: React.memo로 props가 변경되지 않으면 리렌더링 방지
export default memo(MovieCard);
