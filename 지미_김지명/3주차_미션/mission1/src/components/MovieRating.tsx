import React from 'react';
import type { MovieDetail } from '../types/movie';

interface MovieRatingProps {
    movieDetail: MovieDetail;
}

export const MovieRating: React.FC<MovieRatingProps> = ({ movieDetail }) => {
    return (
        <div className="flex items-center space-x-4 flex-wrap gap-4">
            {/* 메인 평점 */}
            <div className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 text-white px-6 py-3 rounded-2xl shadow-lg transform hover:scale-105 transition-transform duration-200">
                <div className="flex items-center">
                    <span className="text-3xl mr-2">⭐</span>
                    <div>
                        <div className="text-2xl font-bold">
                            {movieDetail.vote_average.toFixed(1)}
                        </div>
                        <div className="text-xs opacity-90">TMDB 평점</div>
                    </div>
                </div>
            </div>
            
            {/* 별점 표시 (5점 만점) */}
            <div className="flex flex-col">
                <div className="flex items-center mb-1">
                    {Array.from({ length: 5 }, (_, i) => {
                        const starValue = movieDetail.vote_average / 2;
                        if (i < Math.floor(starValue)) {
                            return <span key={i} className="text-yellow-400 text-xl">★</span>;
                        } else if (i === Math.floor(starValue) && starValue % 1 >= 0.5) {
                            return <span key={i} className="text-yellow-400 text-xl">★</span>;
                        } else {
                            return <span key={i} className="text-gray-300 text-xl">★</span>;
                        }
                    })}
                    <span className="ml-2 text-sm text-gray-600 font-medium">
                        {(movieDetail.vote_average / 2).toFixed(1)}/5.0
                    </span>
                </div>
                
                <div className="text-sm text-gray-600">
                    <span className="font-semibold">{movieDetail.vote_count.toLocaleString()}</span>명이 평가
                </div>
            </div>
            
            {/* 인기도 게이지 */}
            <div className="flex flex-col">
                <div className="text-sm text-gray-600 mb-1">인기도</div>
                <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                        className="h-full bg-gradient-to-r from-green-400 to-blue-500 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${Math.min((movieDetail.popularity / 1000) * 100, 100)}%` }}
                    ></div>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                    {Math.round(movieDetail.popularity)} pts
                </div>
            </div>
        </div>
    );
};