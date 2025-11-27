import { type Movie } from "../types/movie";

interface MovieCardProps {
  movie: Movie;
  onClick?: () => void;
}

const MovieCard = ({ movie, onClick }: MovieCardProps) => {
  return (
    <div
      className="group relative overflow-hidden rounded-xl shadow-lg
                 transition-transform duration-300 hover:scale-105
                 aspect-[2/3]"
      onClick={onClick}
    >
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className="absolute inset-0 w-full h-full object-cover transition duration-300 group-hover:blur-[2px]"
      />
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
  );
};

export default MovieCard;
