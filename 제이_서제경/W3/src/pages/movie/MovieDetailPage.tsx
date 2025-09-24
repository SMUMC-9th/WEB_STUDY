import { useParams, useNavigate } from "react-router-dom";
import type { Credit, MovieDetailResponse } from "../../types/movie";
import { LoadingSpinner } from "../../components/common/LoadingSpinner";
import useCustomFetch from "../../hooks/useCustomFetch";
import { Star, ArrowLeft } from "lucide-react";
import defaultProfile from "../../assets/defaultProfile.jpg";

export default function MovieDetailPage() {
  // 1. URL에서 movieId를 가져오기
  const { movieId } = useParams<{ movieId: string }>();
  const navigate = useNavigate();

  // 2. 영화 정보 요청용 URL
  const movieUrl = `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`;

  // 출연진(감독/배우) 정보 요청용 URL
  const creditsUrl = `https://api.themoviedb.org/3/movie/${movieId}/credits?language=ko-KR`;

  const goBack = () => {
    const idx = (window.history.state as { idx?: number } | null)?.idx ?? 0;
    if (idx > 0) navigate(-1);
  };

  // 3. 영화 정보 가져오기
  const {
    data: movie,
    isPending: moviePending,
    isError: movieError,
  } = useCustomFetch<MovieDetailResponse>(movieUrl);

  // 4. 출연진 정보 가져오기
  const {
    data: creditsData,
    isPending: creditsPending,
    isError: creditsError,
  } = useCustomFetch<{ cast: Credit[] }>(creditsUrl);

  // 5. 공통 로딩/에러 상태 관리 : 둘 중 하나라도 에러, 로딩이면 전체 처리
  const isPending = moviePending || creditsPending;
  const isError = movieError || creditsError;

  if (isError) {
    return (
      <div className="text-red-500 text-2xl text-center mt-10">
        에러가 발생했습니다.
      </div>
    );
  }

  // 7. 로딩 중 화면 : 로딩 스피너 보여줌
  if (isPending || !movie || !creditsData) {
    return (
      <div className="flex items-center justify-center h-dvh backdrop-blur-sm bg-white/70 rounded-full p-3">
        <LoadingSpinner />
      </div>
    );
  }

  // 8. 출연진 정보를 분리
  const credits = creditsData.cast;

  return (
    <div className="text-white bg-black min-h-dvh">
      <div
        className="relative h-[550px] bg-cover bg-center"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        }}
      >
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
              <span>{movie.release_date.slice(0, 4)}년</span>
              <span>{movie.runtime}분</span>
            </div>

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

            <p className="mt-4 text-gray-200 text-sm leading-relaxed max-w-2xl">
              {movie.overview}
            </p>
          </div>
        </div>
      </div>

      <div className="p-6 bg-black">
        <h2 className="text-2xl font-bold mb-4">감독/출연</h2>
        <div className="flex overflow-x-auto gap-4 pb-2">
          {credits.slice(0, 15).map((person) => (
            <div
              key={person.id}
              className="flex-shrink-0 w-24 text-center hover:scale-105 transition"
            >
              <img
                src={
                  person.profile_path
                    ? `https://image.tmdb.org/t/p/w185${person.profile_path}`
                    : defaultProfile
                }
                alt={person.name}
                className="w-24 h-24 rounded-full object-cover mx-auto mb-2 shadow-md"
              />

              <p className="text-sm font-semibold truncate">{person.name}</p>

              <p className="text-xs text-gray-400 truncate">
                {person.character}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
