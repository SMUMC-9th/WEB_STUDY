import type { Movie } from "../types/movie.ts";

interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
}

export default function MovieModal({ movie, onClose }: MovieModalProps) {
  const imageBaseUrl = "https://image.tmdb.org/t/p/w1280";
  const fallbackImg = "https://via.placeholder.com/1280x720?text=No+Image";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose} // 배경 클릭하면 닫힘
    >
      <div
        className="relative w-[90%] max-w-4xl overflow-hidden rounded-2xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()} // 모달 내부 클릭 시 닫히지 않도록
      >
        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 rounded-full bg-black/60 px-3 py-1 text-white transition hover:bg-black"
        >
          ✕
        </button>

        {/* 배경 이미지 */}
        <div className="relative h-60 w-full">
          <img
            src={
              movie.backdrop_path
                ? `${imageBaseUrl}${movie.backdrop_path}`
                : fallbackImg
            }
            alt="backdrop"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        </div>

        {/* 내용 */}
        <div className="flex gap-6 p-6">
          {/* 포스터 */}
          <img
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : "https://via.placeholder.com/500x750?text=No+Image"
            }
            alt={movie.title}
            className="h-72 w-48 rounded-lg object-cover shadow-lg"
          />

          {/* 텍스트 정보 */}
          <div className="flex-1 text-gray-800">
            <h2 className="mb-1 text-3xl font-bold">{movie.title}</h2>
            <p className="mb-4 text-sm text-gray-500">
              원제: {movie.original_title}
            </p>

            <div className="mb-4 flex gap-4 text-sm">
              <span className="rounded bg-gray-200 px-2 py-1">
                개봉일: {movie.release_date}
              </span>
              <span className="rounded bg-gray-200 px-2 py-1">
                인기도: {movie.popularity}
              </span>
              <span className="rounded bg-gray-200 px-2 py-1">
                ⭐ {movie.vote_average} ({movie.vote_count}명)
              </span>
            </div>

            <p className="text-sm leading-relaxed">
              {movie.overview || "줄거리가 제공되지 않습니다."}
            </p>

            {/* TMDB 검색 링크 */}
            <a
              href={`https://www.imdb.com/find?q=${encodeURIComponent(
                movie.title,
              )}`}
              target="_blank"
              className="mt-5 inline-block text-blue-600 underline hover:text-blue-800"
            >
              IMDb에서 검색하기 →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
