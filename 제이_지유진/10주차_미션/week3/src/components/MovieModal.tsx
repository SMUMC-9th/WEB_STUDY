import type { Movie } from "../types/movie";

interface Props {
  movie: Movie;
  onClose: () => void;
}

export default function MovieModal({ movie, onClose }: Props) {
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
      <div className="bg-gray-900 text-white rounded-2xl shadow-2xl max-w-2xl w-full p-6 relative transform animate-scaleIn">
        <button
          className="absolute top-4 right-4 text-gray-300 hover:text-white transition text-2xl"
          onClick={onClose}
        >
          ✕
        </button>

        {/* Content Layout */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Poster */}
          <div className="md:w-1/3">
            <img
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : "https://joonfont.com/wp-content/uploads/2019/07/notdef2.jpg"
              }
              alt={movie.title}
              className="rounded-xl shadow-lg w-full"
            />
          </div>

          {/* Info */}
          <div className="md:w-2/3 flex flex-col">
            <h2 className="text-3xl font-bold mb-2">{movie.title}</h2>
            <p className="text-yellow-400 font-semibold mb-3">
              평점: {movie.vote_average.toFixed(1)}
            </p>

            <div className="text-gray-300 leading-relaxed max-h-60 overflow-y-auto pr-2">
              {movie.overview || "줄거리가 없습니다."}
            </div>
          </div>
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-fadeIn { animation: fadeIn 0.2s ease-out; }
        .animate-scaleIn { animation: scaleIn 0.25s ease-out; }
      `}</style>
    </div>
  );
}
