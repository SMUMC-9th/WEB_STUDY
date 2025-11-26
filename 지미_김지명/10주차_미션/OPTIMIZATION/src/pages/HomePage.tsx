import { useCallback, useMemo, useState } from "react";
import MovieFilter from "../components/MovieFilter";
import MovieList from "../components/MovieList";
import MovieModal from "../components/MovieModal";
import useFetch from "../hooks/useFetch";
import type { Movie, MovieFilters, MovieResponse } from "../types/movie";

export default function HomePage() {
  const [filters, setFilters] = useState<MovieFilters>({
    query: "어벤져스",
    include_adult: false,
    language: "ko-KR",
  });

  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const axiosRequestConfig = useMemo(
    () => ({
      params: filters,
    }),
    [filters]
  );

  const { data, error, isLoading } = useFetch<MovieResponse>(
    "/search/movie",
    axiosRequestConfig
  );

  // 최적화: setFilters는 의존성에서 제거 (stable function)
  const handleMovieFilters = useCallback((filters: MovieFilters) => {
    setFilters(filters);
  }, []);

  const handleMovieClick = useCallback((movie: Movie) => {
    setSelectedMovie(movie);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedMovie(null);
  }, []);

  // 최적화: movies를 useMemo로 메모이제이션
  const movies = useMemo(() => data?.results || [], [data?.results]);

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <MovieFilter onChange={handleMovieFilters} />
      {isLoading ? (
        <div className="flex h-60 items-center justify-center">
          <div className="text-lg font-semibold text-gray-600">
            로딩 중 입니다...
          </div>
        </div>
      ) : (
        <MovieList movies={movies} onMovieClick={handleMovieClick} />
      )}

      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
      )}
    </div>
  );
}
