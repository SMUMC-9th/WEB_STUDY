import type { Movie } from "../types/movie.ts";

interface MovieCardProps {
  movie: Movie;
}

const MovieCard = ({ movie }: MovieCardProps) => {
  const imageBaseUrl = "https://image.tmdb.org/t/p/w500";
  const fallbackImage = "https://via.placeholder.com/640x960?text=No+Image";

  return (
    <div className="group relative w-full overflow-hidden rounded-xl bg-gray-900 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
      {/* 포스터 이미지 영역 */}
      <div className="relative aspect-[2/3] w-full overflow-hidden">
        <img
          src={
            movie.poster_path
              ? `${imageBaseUrl}${movie.poster_path}`
              : fallbackImage
          }
          alt={`${movie.title}의 포스터`}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />

        {/* 호버 시 나타나는 오버레이 */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>

      {/* 평점 */}
      <div className="absolute right-3 top-3 z-10 flex items-center gap-1 rounded-full bg-black/60 px-2 py-1 text-xs font-bold text-yellow-400 backdrop-blur-md">
        <span>★</span>
        <span>{movie.vote_average.toFixed(1)}</span>
      </div>

      {/* 호버 시 나타나는 상세 정보 컨테이너 */}
      <div className="absolute bottom-0 left-0 w-full translate-y-4 px-4 pb-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
        {/* 제목 */}
        <h3 className="mb-1 text-lg font-bold text-white drop-shadow-md line-clamp-1">
          {movie.title}
        </h3>

        {/* 메타 정보 */}
        <div className="mb-2 flex items-center gap-2 text-xs font-medium text-gray-300">
          <span className="rounded bg-white/20 px-1.5 py-0.5 text-white backdrop-blur-sm">
            {movie.original_language.toUpperCase()}
          </span>
          <span>{movie.release_date.split("-")[0]}</span>
        </div>

        {/* 줄거리 (3줄까지만) */}
        <p className="text-sm text-gray-200 line-clamp-3">
          {movie.overview || "상세 설명이 없습니다."}
        </p>
      </div>
    </div>
  );
};

export default MovieCard;
