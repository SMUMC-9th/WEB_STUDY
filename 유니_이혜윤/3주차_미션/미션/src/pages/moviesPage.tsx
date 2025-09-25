import { useEffect, useState } from "react";
import { type MovieResponse, type Movie } from "../types/movie";
import axios from "axios";
import { MovieCard, LoadingSpinner, PageButton } from "../components";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useParams } from "react-router-dom";

const MoviesPage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isPending, setIsPending] = useState(false);
  const [isError, setIsError] = useState(false);
  const [page, setPage] = useState(1);
  const { category } = useParams<{ category: string }>();

  useEffect(() => {
    setPage(1);
  }, [category]);

  useEffect(() => {
    const fetchMovies = async () => {
      setIsPending(true);
      try {
        const { data } = await axios.get<MovieResponse>(
          `https://api.themoviedb.org/3/movie/${category}?language=ko-KR&page=${page}`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
            },
          }
        );
        const filtered = data.results.filter((movie) => movie.adult === false);

        setMovies(filtered);
        setIsError(false);
      } catch {
        setIsError(true);
      } finally {
        setIsPending(false);
      }
    };
    fetchMovies();
  }, [page, category]);

  return (
    <div className="bg-black/95 min-h-screen">
      <div className="container mx-auto max-w-screen-xl px-14 lg:px-20 py-10">
        {isError && (
          <div className="text-red-500 text-2xl">에러가 발생했습니다</div>
        )}

        {isPending ? (
          <LoadingSpinner />
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
              {movies?.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>

            <div className="flex items-center justify-center gap-5 mt-10">
              <PageButton
                onClick={() => setPage((prev) => prev - 1)}
                disabled={page === 1}
              >
                <ChevronLeft color="white" />
              </PageButton>

              <span className="text-white">{page}</span>

              <PageButton onClick={() => setPage((prev) => prev + 1)}>
                <ChevronRight color="white" />
              </PageButton>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MoviesPage;
