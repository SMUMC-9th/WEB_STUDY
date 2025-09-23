import { useEffect, useState } from "react";
import { type MovieResponse, type Movie } from "../types/movie";
import axios from "axios";

const MoviesPage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const { data } = await axios.get<MovieResponse>(
        "https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1",
        { headers: { Authorization: `Bearer ${import.meta.env.VITE_TOKEN}` } }
      );
      setMovies(data.results);
    };
    fetchMovies();
  }, []);

  return (
    <div className="bg-black/95">
      <div className="container mx-auto max-w-screen-xl px-14 lg:px-20 py-20">
        <h1 className="text-2xl font-bold text-white/90 mb-4">인기 영화</h1>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {movies?.map((movie) => (
            <div
              key={movie.id}
              className="group relative overflow-hidden rounded-xl shadow-lg
                         transition-transform duration-300 hover:scale-105
                         aspect-[2/3]"
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="absolute inset-0 w-full h-full object-cover transition duration-300 group-hover:blur-[2px]"
                loading="lazy"
              />

              {/* hover 시, 아래쪽부터 어두워지는 그라데이션 */}
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent
                           opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              />

              <div
                className="pointer-events-none absolute inset-0 flex items-end
                           opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              >
                <div className="w-full p-3 text-white">
                  <h2 className="text-sm font-semibold mb-1 line-clamp-1 break-words">
                    {movie.title}
                  </h2>
                  <p className="text-xs leading-snug text-white/90 line-clamp-4 break-words">
                    {movie.overview || ""}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MoviesPage;
