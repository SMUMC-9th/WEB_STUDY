import { type Movie } from "../types/movie";

interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
}

const MovieModal = ({ movie, onClose }: MovieModalProps) => {
  //   console.log(movie);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
      onClick={onClose}
    >
      <div
        className="relative w-[560px] overflow-y-auto rounded bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-3 text-xl text-gray-500 cursor-pointer"
          aria-label="닫기"
        >
          ✕
        </button>

        <div className="w-full h-80 overflow-hidden mb-6">
          <img
            src={
              movie.backdrop_path
                ? `https://image.tmdb.org/t/p/w780${movie.backdrop_path}`
                : "/no-poster.png"
            }
            alt={movie.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1 px-7">
          <h2 className="text-2xl font-bold">{movie.title}</h2>
          {movie.original_title && movie.original_title !== movie.title && (
            <p className="text-sm text-gray-500">{movie.original_title}</p>
          )}

          <div className="mt-3 gap-3 flex justify-center text-sm text-gray-600">
            {movie.release_date && <span>개봉일 : {movie.release_date}</span>}

            {typeof movie.vote_average === "number" && (
              <span>⭐ {movie.vote_average.toFixed(1)}</span>
            )}
          </div>

          {movie.overview && (
            <p className="mt-3 text-sm leading-relaxed text-gray-600">
              {movie.overview}
            </p>
          )}
        </div>

        <div className="flex justify-end gap-2 p-3">
          <button
            onClick={() => {
              const query = encodeURIComponent(movie.title);
              window.open(`https://www.imdb.com/find?q=${query}`, "_blank");
            }}
            className="rounded-md bg-[#2370cdae] px-3 py-2 text-xs text-white"
          >
            IMDb에서 검색
          </button>
          <button
            onClick={onClose}
            className="rounded-md border border-gray-300 px-3 py-2 text-xs"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;
