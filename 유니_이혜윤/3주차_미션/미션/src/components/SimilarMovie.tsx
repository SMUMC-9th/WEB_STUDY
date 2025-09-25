import { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "./MovieCard";
import { type Movie } from "../types/movie";

interface SimilarMovieProps {
  movieId: number | string;
}

const SimilarMovie = ({ movieId }: SimilarMovieProps) => {
  const [items, setItems] = useState<Movie[]>([]);
  const [isPending, setIsPending] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (!movieId) return;
    const fetchSimilar = async () => {
      setIsPending(true);
      setIsError(false);
      try {
        const { data } = await axios.get<{ results: Movie[] }>(
          `https://api.themoviedb.org/3/movie/${movieId}/similar?language=ko-KR&page=1`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
              Accept: "application/json",
            },
          }
        );
        setItems(data.results);
      } catch {
        setIsError(true);
      } finally {
        setIsPending(false);
      }
    };
    fetchSimilar();
  }, [movieId]);

  if (isPending) {
    return <p className="text-white">로딩 중...</p>;
  }

  if (isError) {
    return <p className="text-red-500">비슷한 영화를 불러올 수 없습니다.</p>;
  }

  return (
    <section className="container mx-auto max-w-screen-xl">
      <h2 className="text-xl font-semibold text-white/90 mb-5">추천 영화</h2>
      <div className="flex gap-6 overflow-x-auto">
        {items.map((movie) => (
          <div key={`similar-${movie.id}`} className="flex-shrink-0 w-40">
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default SimilarMovie;
