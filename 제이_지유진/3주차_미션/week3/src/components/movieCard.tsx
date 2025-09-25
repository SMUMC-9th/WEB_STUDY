import { useNavigate } from "react-router-dom";
import type { Movie } from "../types/movie";

type MovieCardProps = {
  movie: Movie;
};

export default function MovieCard({ movie }: MovieCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/detail/${movie.id}`);
  };
  return (
    <li
      key={movie.id}
      className="relative bg-gray-800 rounded-lg overflow-hidden shadow-lg group aspect-[2/3]"
      onClick={handleClick}
    >
      <img
        src={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : "https://joonfont.com/wp-content/uploads/2019/07/notdef2.jpg"
        }
        alt={movie.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4 text-center">
        <h3 className="text-lg font-bold mb-2">{movie.title}</h3>
        <p className="text-sm text-gray-300 line-clamp-3">
          {movie.overview || "줄거리가 없습니다."}
        </p>
        <span className="mt-2 text-yellow-400 font-semibold">
          평점: {movie.vote_average.toFixed(1)}
        </span>
      </div>
    </li>
  );
}
