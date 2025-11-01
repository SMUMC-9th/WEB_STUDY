import { Link } from "react-router-dom";
import type { Movie } from "../../types/movie";

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const poster = movie.poster_path
    ? `https://image.tmdb.org/t/p/w342${movie.poster_path}`
    : "/placeholder-poster.png";

  return (
    <Link
      to={`/movie/${movie.id}`}
      className="group relative block w-44 overflow-hidden rounded-xl shadow-lg
                 transition-transform duration-300 ease-out hover:scale-105
                 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b2dab1]"
      aria-label={`${movie.title} 상세 보기`}
      title={movie.title}
    >
      <img
        src={poster}
        alt={`${movie.title} 포스터`}
        className="w-full h-auto"
        loading="lazy"
        decoding="async"
      />

      <div
        className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center
                   bg-gradient-to-t from-black/60 to-transparent backdrop-blur-md
                   opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      >
        <h2 className="px-3 text-center text-base font-semibold text-white line-clamp-2">
          {movie.title}
        </h2>
        <p className="mt-2 px-3 text-xs text-white/90 leading-relaxed line-clamp-4">
          {movie.overview}
        </p>
      </div>
    </Link>
  );
}
