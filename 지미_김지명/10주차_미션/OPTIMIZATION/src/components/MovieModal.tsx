import { useEffect } from "react";
import type { Movie } from "../types/movie";

interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
}

const MovieModal = ({ movie, onClose }: MovieModalProps) => {
  const imageBaseUrl = "https://image.tmdb.org/t/p/w500";
  const backdropBaseUrl = "https://image.tmdb.org/t/p/original";
  const fallbackImage = "http://via.placeholder.com/300x450";

  // ESC 키로 모달 닫기
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  // 모달이 열려있을 때 body 스크롤 방지
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleImdbSearch = () => {
    const searchUrl = `https://www.imdb.com/find?q=${encodeURIComponent(
      movie.title
    )}`;
    window.open(searchUrl, "_blank");
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      onClick={handleBackdropClick}
    >
      <div className="relative max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-2xl">
        {/* 닫기 버튼 (우측 상단) */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white text-gray-700 shadow-lg transition-all hover:bg-gray-100 cursor-pointer"
          aria-label="닫기"
        >
          ✕
        </button>

        {/* 상단 배경 이미지 영역 */}
        <div className="relative h-64 w-full overflow-hidden bg-linear-to-br from-teal-900 to-teal-700">
          {movie.backdrop_path && (
            <>
              <img
                src={`${backdropBaseUrl}${movie.backdrop_path}`}
                alt={`${movie.title} 배경`}
                className="h-full w-full object-cover opacity-40"
              />
              <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-white" />
            </>
          )}

          {/* 제목과 원제 */}
          <div className="absolute bottom-6 left-6 z-10">
            <h2 className="mb-1 text-3xl font-bold text-white drop-shadow-lg">
              {movie.title}
            </h2>
            {movie.original_title !== movie.title && (
              <p className="text-lg text-white text-opacity-90 drop-shadow-md">
                {movie.original_title}
              </p>
            )}
          </div>
        </div>

        {/* 하단 컨텐츠 영역 */}
        <div
          className="overflow-y-auto bg-white"
          style={{ maxHeight: "calc(90vh - 16rem)" }}
        >
          <div className="flex flex-col gap-6 p-6 md:flex-row">
            {/* 왼쪽: 포스터 */}
            <div className="shrink-0">
              <img
                src={
                  movie.poster_path
                    ? `${imageBaseUrl}${movie.poster_path}`
                    : fallbackImage
                }
                alt={`${movie.title} 포스터`}
                className="h-auto w-full rounded-lg shadow-lg md:w-64"
              />
            </div>

            {/* 오른쪽: 정보 */}
            <div className="flex-1">
              {/* 평점 */}
              <div className="mb-4 flex items-center gap-2">
                <span className="text-3xl font-bold text-blue-600">
                  {movie.vote_average.toFixed(1)}
                </span>
                <span className="text-sm text-gray-500">
                  ({movie.vote_count.toLocaleString()} 평가)
                </span>
              </div>

              {/* 개봉일 */}
              <div className="mb-4">
                <h3 className="mb-1 text-sm font-semibold text-gray-700">
                  개봉일
                </h3>
                <p className="text-base text-gray-900">
                  {movie.release_date || "정보 없음"}
                </p>
              </div>

              {/* 인기도 */}
              <div className="mb-4">
                <h3 className="mb-1 text-sm font-semibold text-gray-700">
                  인기도
                </h3>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-full max-w-xs overflow-hidden rounded-full bg-gray-200">
                    <div
                      className="h-full bg-blue-500"
                      style={{
                        width: `${Math.min(
                          (movie.popularity / 1000) * 100,
                          100
                        )}%`,
                      }}
                    />
                  </div>
                  <span className="text-sm text-gray-600">
                    {movie.popularity.toFixed(0)}
                  </span>
                </div>
              </div>

              {/* 줄거리 */}
              <div className="mb-6">
                <h3 className="mb-2 text-sm font-semibold text-gray-700">
                  줄거리
                </h3>
                <p className="leading-relaxed text-gray-800">
                  {movie.overview || "줄거리 정보가 없습니다."}
                </p>
              </div>

              {/* 버튼 그룹 */}
              <div className="flex gap-3">
                <button
                  onClick={handleImdbSearch}
                  className="rounded-lg bg-blue-600 px-6 py-2.5 font-semibold text-white shadow-md transition-all hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 cursor-pointer"
                >
                  IMDb에서 검색
                </button>
                <button
                  onClick={onClose}
                  className="rounded-lg border border-gray-300 bg-white px-6 py-2.5 font-semibold text-gray-700 shadow-sm transition-all hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 cursor-pointer"
                >
                  닫기
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;
