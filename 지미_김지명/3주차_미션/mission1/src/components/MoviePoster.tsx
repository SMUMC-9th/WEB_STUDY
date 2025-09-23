import React from 'react';
import type { MovieDetail } from '../types/movie';

interface MoviePosterProps {
    movieDetail: MovieDetail;
}

export const MoviePoster: React.FC<MoviePosterProps> = ({ movieDetail }) => {
    if (movieDetail.poster_path) {
        return (
            <div className="w-full max-w-sm">
                <img 
                    src={`https://image.tmdb.org/t/p/w500${movieDetail.poster_path}`}
                    alt={`${movieDetail.title} 포스터`}
                    className="w-full rounded-xl shadow-2xl transition-transform duration-300 hover:scale-105"
                    loading="lazy"
                />
            </div>
        );
    }

    return (
        <div className="w-full max-w-sm h-96 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 rounded-xl flex items-center justify-center shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent transform -skew-x-12 animate-pulse"></div>
            </div>
            
            <div className="text-center text-gray-600 relative z-10">
                <div className="text-6xl mb-4 animate-bounce">🎬</div>
                <p className="text-lg font-medium">포스터 준비 중</p>
                <p className="text-sm mt-2">이미지가 곧 업데이트됩니다</p>
            </div>
        </div>
    );
};