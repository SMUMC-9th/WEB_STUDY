import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import type { Movie, MovieResponse } from "../../types/movie";
import { LoadingSpinner } from "../../components/common/LoadingSpinner";
import Pagination from "../../components/common/Pagination";
import MovieCard from "../../components/movie/MovieCard";

export default function MoviePage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isPending, setIsPending] = useState(false);
  const [isError, setIsError] = useState(false);
  const [page, setPage] = useState(1);

  const { category } = useParams<{ category: string }>();
  const prevCategory = useRef<string | undefined>(category);

  useEffect(() => {
    if (category !== prevCategory.current) {
      prevCategory.current = category;
      if (page !== 1) {
        setPage(1);
      }
      if (page !== 1) return;
    }

    const controller = new AbortController();
    const run = async () => {
      try {
        setIsPending(true);
        setIsError(false);
        const res = await axios.get<MovieResponse>(
          `https://api.themoviedb.org/3/movie/${category}?language=ko-KR&page=${page}`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
            },
            signal: controller.signal,
          }
        );
        setMovies(res.data?.results ?? []);
      } finally {
        if (!controller.signal.aborted) setIsPending(false);
      }
    };

    run();
    return () => controller.abort();
  }, [category, page]);

  if (isError) {
    return (
      <div className="p-6 text-center text-rose-600">에러가 발생했습니다.</div>
    );
  }

  return (
    <>
      <Pagination page={page} onPageChange={setPage} />

      {isPending && (
        <div className="flex items-center justify-center h-dvh backdrop-blur-sm bg-white/70 rounded-full p-3">
          <LoadingSpinner />
        </div>
      )}

      {!isPending && (
        <div className="mx-auto max-w-7xl  grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-1 gap-y-8 place-items-center">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </>
  );
}
