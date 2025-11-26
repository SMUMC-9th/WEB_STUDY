import type { Movie } from "../types/movie.ts";
import MovieCard from "./MovieCard.tsx";

interface MovieListProps {
  movies: Movie[];
}

// props 구조 분해 (원래는 props.movies)
const MovieList = ({ movies }: MovieListProps) => {
  if (movies.length === 0) {
    // 검색 결과가 없을 시
    return (
      <div className="flex h-60 items-center justify-center">
        <p className="font-bold text-gray-500">검색 결과가 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="p-10">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default MovieList;
