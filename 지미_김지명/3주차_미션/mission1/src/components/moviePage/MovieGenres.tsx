import React from 'react';
import type { MovieDetail } from '../../types/movie';
import { getGenreColor } from '../../utils/movieUtils';

interface MovieGenresProps {
    movieDetail: MovieDetail;
}

export const MovieGenres: React.FC<MovieGenresProps> = ({ movieDetail }) => {
    if (!movieDetail.genres || movieDetail.genres.length === 0) return null;

    return (
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6 border border-purple-100">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4 flex items-center">
                <span className="mr-2">🎭</span>
                장르
            </h3>
            <div className="flex flex-wrap gap-3">
                {movieDetail.genres.map((genre, index) => (
                    <span 
                        key={genre.id} 
                        className={`px-4 py-2 bg-gradient-to-r ${getGenreColor(genre.name)} text-white rounded-full text-sm font-medium shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 cursor-default`}
                        style={{
                            animationDelay: `${index * 100}ms`
                        }}
                    >
                        {genre.name}
                    </span>
                ))}
            </div>
            
            <div className="mt-4 text-xs text-gray-500">
                총 {movieDetail.genres.length}개의 장르
            </div>
        </div>
    );
};