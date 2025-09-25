import { useParams, useNavigate } from "react-router-dom";
import useCustomFetch from "../../hooks/useCustomFetch";
import type { MovieDetailResponse, MovieResponse } from "../../types/movie";
import { LoadingSpinner } from "../../components/common/LoadingSpinner";
import MovieCard from "../../components/movie/MovieCard";
import MovieCredit from "../../components/movie/MovieCredit";
import BackVideo from "../../components/movie/BackVideo";
import { Star, ArrowLeft } from "lucide-react";

export default function MovieDetailPage() {
  const { movieId } = useParams<{ movieId: string }>();
  const navigate = useNavigate();

  const movieUrl = `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`;
  const similarUrl = `https://api.themoviedb.org/3/movie/${movieId}/similar?language=ko-KR&page=1`;

  // 뒤로 가기
  const goBack = () => {
    const idx = (window.history.state as { idx?: number } | null)?.idx ?? 0;
    if (idx > 0) navigate(-1);
  };

  // 영화 상세
  const {
    data: movie,
    isPending: moviePending,
    isError: movieError,
  } = useCustomFetch<MovieDetailResponse>(movieUrl);

  // 비슷한 영화 - MovieResponse 타입으로 사용해야함!! (MovieDetailResponse X)
  const {
    data: similarMovies,
    isPending: similarPending,
    isError: similarError,
  } = useCustomFetch<MovieResponse>(similarUrl);

  const isAllPending = moviePending || similarPending;
  const isAllError = movieError || similarError;

  // 에러 처리
  if (isAllError) {
    return (
      <div className="text-red-500 text-2xl text-center mt-10">
        에러가 발생했습니다.
      </div>
    );
  }

  // 로딩 처리
  if (isAllPending || !movie || !similarMovies || !movieId) {
    return (
      <div className="flex items-center justify-center h-dvh backdrop-blur-sm bg-white/70 rounded-full p-3">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="text-white bg-black min-h-dvh">
      <div className="relative">
        {/* 배경 영상 컴포넌트 */}
        <BackVideo backdropPath={movie.backdrop_path} height={550} />

        {/* 뒤로 가기 */}
        <button
          type="button"
          onClick={goBack}
          aria-label="뒤로 가기"
          className="absolute left-4 top-4 z-10 rounded-full bg-black/50 p-2 backdrop-blur hover:bg-black/60 focus-visible:outline-white"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full p-6 md:flex items-end gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">{movie.title}</h1>
            <div className="mt-3 flex gap-3 text-sm text-gray-300">
              <span className="flex flex-row gap-2 items-center">
                <Star className="w-4 h-4" />
                {movie.vote_average.toFixed(1)}
              </span>
              <span>{movie.release_date?.slice(0, 4)}년</span>
              <span>{movie.runtime}분</span>
            </div>

            {/* 장르 */}
            <div className="mt-3 flex flex-wrap gap-2 text-xs text-white">
              {movie.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="bg-white/10 px-2 py-1 rounded-full border border-white/20"
                >
                  {genre.name}
                </span>
              ))}
            </div>

            <p className="mt-4 text-gray-200 text-[15px] leading-relaxed max-w-2xl line-clamp-4">
              {movie.overview || "줄거리 정보가 없습니다."}
            </p>
          </div>
        </div>
      </div>

      {/* 출연진 */}
      <div className="p-6 bg-black">
        <h2 className="text-2xl font-bold mb-4">감독/출연</h2>
        <MovieCredit movieId={movieId} />

        {/* 비슷한 영화 - 가로 스크롤 (overflow-x-auto & flex-nowrap) */}
        <h2 className="text-2xl font-bold mt-8 mb-4">비슷한 영화</h2>
        {similarMovies.results.length === 0 ? (
          <p className="text-gray-400">추천할 영화가 없습니다.</p>
        ) : (
          <div className=" w-full overflow-x-auto overflow-y-hidden scroll-smooth">
            <div className=" flex flex-nowrap gap-4 p-2 snap-x snap-mandatory">
              {similarMovies.results.map((m) => (
                <div key={m.id} className="snap-start shrink-0">
                  <MovieCard movie={m} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
