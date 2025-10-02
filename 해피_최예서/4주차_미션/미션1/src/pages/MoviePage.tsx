import { useState } from "react";
import { useParams } from "react-router-dom";
import type { Movie, MovieResponse } from "../types/movie";
import MovieCard from "../components/MovieCard";
import LoadingSpinner from "./LoadingSpinner";
import { useCustomFetch } from "../hooks/useCustomFetch";

export default function MoviePage() {
  const params = useParams<{ category: string }>();
  const [page, setPage] = useState(1);

  const { data, isPending, error } = useCustomFetch<MovieResponse>(
    `https://api.themoviedb.org/3/movie/${params.category}?language=ko-KR&page=${page}`,
    [page, params.category]
  );

  const movies = data?.results || [];

  if (error) return <p className="text-center mt-4 text-red-500">{error}</p>;

  return (
    <>
      <div className='flex items-center justify-center gap-6 mt-5'>
        <button
          className='bg-[#dda5e3] cursor-pointer text-white px-5 py-3 rounded-lg shadow-md hover:bg-[#b2dad1] transition-all duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed'
          disabled={page === 1}
          onClick={() => setPage(prev => prev - 1)}
        > {`<`} </button>
        <span> {page} page </span>
        <button
          className='bg-[#dda5e3] cursor-pointer text-white px-5 py-3 rounded-lg shadow-md hover:bg-[#b2dad1] transition-all duration-200'
          onClick={() => setPage(prev => prev + 1)}
        > {`>`} </button>
      </div>

      {isPending && (
        <div className='flex justify-center items-center h-dvh'>
          <LoadingSpinner />
        </div>
      )}

      {!isPending && (
        <div className='p-10 grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6'>
          {movies.map((movie: Movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </>
  );
}
