import { useParams } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import LoadingSpinner from "./LoadingSpinner";
import { useCustomFetch } from "../hooks/useCustomFetch";
import type { Movie, MovieResponse } from "../types/movie";

export default function RelatedMoviePage() {
  const { movieId } = useParams();
  const { data, isPending, error } = useCustomFetch<MovieResponse>(
    `https://api.themoviedb.org/3/movie/${movieId}/similar?language=ko-KR&page=1`,
    [movieId]
  );

  const movies = data?.results || [];

  if (isPending) return <LoadingSpinner />
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className='flex flex-col justify-center items-center mt-5'>
      <div className='text-xl mb-5'>비슷한 영화 목록입니다</div>
      <div className='gap-6 flex flex-wrap justify-center'>
        {movies.map((movie: Movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}
