import type { Movie } from "../../types/movie"

interface SimilarMovieProps {
    similarMovie: Movie; 
    movieId?: string;
}

export const SimilarMovie: React.FC<SimilarMovieProps> = ({ similarMovie }) => {
    return (
        <div className="mt-4 w-44 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden cursor-pointer transition-transform hover:scale-105">
            <img 
                src={`https://image.tmdb.org/t/p/w200${similarMovie.poster_path}`}
                alt={`${similarMovie.title} 포스터`}
                className="w-full h-64 object-cover"
            />
            <div className="p-3">
                <h3 className="font-bold text-sm truncate">{similarMovie.title}</h3>
                <p className="text-xs text-gray-600 mt-1">평점: {similarMovie.vote_average.toFixed(1)}</p>
            </div>
        </div>
    );
};