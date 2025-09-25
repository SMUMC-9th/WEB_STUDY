import React from 'react';
import type { MovieDetail } from '../../types/movie';
import { 
    convertToFivePointScale, 
    generateStarRating, 
    convertPopularityToPercentage,
    getRatingColor,
    formatVoteCount 
} from '../../utils/movieUtils';

interface MovieRatingProps {
    movieDetail: MovieDetail;
}

export const MovieRating: React.FC<MovieRatingProps> = ({ movieDetail }) => {
    const fivePointRating = convertToFivePointScale(movieDetail.vote_average);
    const starRating = generateStarRating(movieDetail.vote_average);
    const popularityPercentage = convertPopularityToPercentage(movieDetail.popularity);
    const ratingColorClass = getRatingColor(movieDetail.vote_average);
    const formattedVoteCount = formatVoteCount(movieDetail.vote_count);

    const renderStar = (type: 'full' | 'half' | 'empty', index: number) => {
        switch (type) {
            case 'full':
                return <span key={index} className="text-yellow-400 text-xl">★</span>;
            case 'half':
                return <span key={index} className="text-yellow-400 text-xl">★</span>;
            case 'empty':
                return <span key={index} className="text-gray-300 text-xl">★</span>;
        }
    };

    return (
        <div className="flex items-center space-x-4 flex-wrap gap-4">
            {/* 메인 평점 */}
            <div className={`bg-gradient-to-r ${ratingColorClass} text-white px-6 py-3 rounded-2xl shadow-lg transform hover:scale-105 transition-transform duration-200`}>
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
                    {starRating.map((starType, index) => renderStar(starType, index))}
                    <span className="ml-2 text-sm text-gray-600 font-medium">
                        {fivePointRating.toFixed(1)}/5.0
                    </span>
                </div>
                
                <div className="text-sm text-gray-600">
                    <span className="font-semibold">{formattedVoteCount}</span>명이 평가
                </div>
            </div>
            
            {/* 인기도 게이지 */}
            <div className="flex flex-col">
                <div className="text-sm text-gray-600 mb-1">인기도</div>
                <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                        className="h-full bg-gradient-to-r from-green-400 to-blue-500 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${popularityPercentage}%` }}
                    ></div>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                    {Math.round(movieDetail.popularity)} pts
                </div>
            </div>
        </div>
    );
};