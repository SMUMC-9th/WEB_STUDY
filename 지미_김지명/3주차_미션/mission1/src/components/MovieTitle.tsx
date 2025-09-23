import React from 'react';
import type { MovieDetail } from '../types/movie';

interface MovieTitleProps {
    movieDetail: MovieDetail;
    showBackdropVersion?: boolean;
}

export const MovieTitle: React.FC<MovieTitleProps> = ({ movieDetail, showBackdropVersion = false }) => {
    if (showBackdropVersion && movieDetail.backdrop_path) {
        return (
            <div className="border-l-4 border-gradient-to-b from-[#dda5e3] to-[#b2dab1] pl-4">
                <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2">
                    {movieDetail.title}
                </h1>
                {movieDetail.original_title !== movieDetail.title && (
                    <h2 className="text-lg md:text-xl text-gray-600 font-medium">
                        <span className="text-sm text-gray-400 mr-2">원제:</span>
                        {movieDetail.original_title}
                    </h2>
                )}
                
                <div className="flex items-center space-x-4 mt-3 text-sm text-gray-500">
                    <div className="flex items-center">
                        <span className="mr-1">📅</span>
                        <span>{new Date(movieDetail.release_date).getFullYear()}</span>
                    </div>
                    <div className="flex items-center">
                        <span className="mr-1">🌍</span>
                        <span>{movieDetail.original_language.toUpperCase()}</span>
                    </div>
                    <div className="flex items-center">
                        <span className="mr-1">⏱️</span>
                        <span>{Math.floor(movieDetail.runtime / 60)}시간 {movieDetail.runtime % 60}분</span>
                    </div>
                </div>
            </div>
        );
    }

    if (!movieDetail.backdrop_path) {
        return (
            <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                    {movieDetail.title}
                </h1>
                {movieDetail.original_title !== movieDetail.title && (
                    <h2 className="text-xl md:text-2xl text-gray-600 mb-3">
                        {movieDetail.original_title}
                    </h2>
                )}
                {movieDetail.tagline && (
                    <p className="text-lg italic text-gray-700">
                        &quot;{movieDetail.tagline}&quot;
                    </p>
                )}
            </div>
        );
    }

    return null;
};