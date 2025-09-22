import { useEffect, useState } from "react";
import type { Movie, MovieResponse } from "../types/movie";
import axios from "axios";
import MovieCard from "../components/movieCard";
import Pagination from "../components/Pagenation";
import Skeleton from "../components/Skeleton";
export default function Now() {
  const [now, setNow] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchMovies = async (page = 1) => {
    setIsLoading(true);
    setError(null);
    try {
      const { data } = await axios.get<MovieResponse>(
        `https://api.themoviedb.org/3/movie/now_playing?language=ko-KR&page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
          },
        }
      );
      setNow(data.results);
      setTotalPages(data.total_pages);
    } catch {
      setError("영화를 불러오는 중에 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies(currentPage);
  }, [currentPage]);

  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <div className="p-4 text-white">
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPrev={handlePrev}
        onNext={handleNext}
      />
      {isLoading && (
        <>
          <Skeleton />
        </>
      )}

      {error && <div className="text-red-500 text-center mt-20">{error}</div>}

      {!isLoading && !error && (
        <>
          <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {now.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
