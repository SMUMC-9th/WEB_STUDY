import React from 'react';
import type { MovieDetail } from '../../types/movie';
import { formatReleaseDate, getRelativeDateInfo, getStatusInKorean, getLanguageInKorean } from '../../utils/movieUtils';

interface MovieBasicInfoProps {
    movieDetail: MovieDetail;
}

export const MovieBasicInfo: React.FC<MovieBasicInfoProps> = ({ movieDetail }) => {
    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200 hover:shadow-md transition-shadow duration-200">
                <div className="flex items-center mb-2">
                    <span className="text-2xl mr-2">📅</span>
                    <div className="text-xs text-blue-600 font-semibold uppercase tracking-wide">개봉일</div>
                </div>
                <div className="font-bold text-gray-800 text-lg">
                    {formatReleaseDate(movieDetail.release_date)}
                </div>
                <div className="text-xs text-gray-600 mt-1">
                    {getRelativeDateInfo(movieDetail.release_date)}
                </div>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 border border-green-200 hover:shadow-md transition-shadow duration-200">
                <div className="flex items-center mb-2">
                    <span className="text-2xl mr-2">⏱️</span>
                    <div className="text-xs text-green-600 font-semibold uppercase tracking-wide">상영시간</div>
                </div>
                <div className="font-bold text-gray-800 text-lg">
                    {Math.floor(movieDetail.runtime / 60)}시간 {movieDetail.runtime % 60}분
                </div>
                <div className="text-xs text-gray-600 mt-1">
                    총 {movieDetail.runtime}분
                </div>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 border border-purple-200 hover:shadow-md transition-shadow duration-200">
                <div className="flex items-center mb-2">
                    <span className="text-2xl mr-2">🎬</span>
                    <div className="text-xs text-purple-600 font-semibold uppercase tracking-wide">상태</div>
                </div>
                <div className="font-bold text-gray-800 text-lg">
                    {getStatusInKorean(movieDetail.status)}
                </div>
                <div className="text-xs text-gray-600 mt-1">
                    {movieDetail.status === 'Released' ? '시청 가능' : '시청 대기'}
                </div>
            </div>
            
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4 border border-orange-200 hover:shadow-md transition-shadow duration-200">
                <div className="flex items-center mb-2">
                    <span className="text-2xl mr-2">🌍</span>
                    <div className="text-xs text-orange-600 font-semibold uppercase tracking-wide">원어</div>
                </div>
                <div className="font-bold text-gray-800 text-lg">
                    {getLanguageInKorean(movieDetail.original_language)}
                </div>
                <div className="text-xs text-gray-600 mt-1">
                    {movieDetail.original_language.toUpperCase()}
                </div>
            </div>
        </div>
    );
};