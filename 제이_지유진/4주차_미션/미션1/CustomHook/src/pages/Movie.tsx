import MovieCard from "../components/movieCard";
import Pagination from "../components/Pagenation";
import Skeleton from "../components/Skeleton";
import { useCustomFetch } from "../hooks/useCustomFetch";
import type { MovieResponse } from "../types/movie";
import { useState, useEffect } from "react";

type MovieCategory = "popular" | "now_playing" | "top_rated" | "upcoming";

interface MovieListProps {
  category: MovieCategory;
}

export default function Movie({ category }: MovieListProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const url = `https://api.themoviedb.org/3/movie/${category}?language=ko-KR&page=${currentPage}`;
  const { data, isLoading, error } = useCustomFetch<MovieResponse>(url);

  useEffect(() => {
    setCurrentPage(1); // 카테고리 바뀌면 첫 페이지로
  }, [category]);

  function handlePrev() {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  }

  const handleNext = () =>
    setCurrentPage((prev) => Math.min(prev + 1, data?.total_pages ?? 1));

  return (
    <div className="p-4 text-white">
      <Pagination
        currentPage={currentPage}
        totalPages={data?.total_pages ?? 1}
        onPrev={handlePrev}
        onNext={handleNext}
      />

      {isLoading && <Skeleton />}
      {error && <div className="text-red-500 text-center mt-20">{error}</div>}

      {!isLoading && !error && data && (
        <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {data.results.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </ul>
      )}
    </div>
  );
}
