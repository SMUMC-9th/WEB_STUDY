import React from 'react';
import type { MovieDetail } from '../types/movie';

interface MoviePlotProps {
    movieDetail: MovieDetail;
}

export const MoviePlot: React.FC<MoviePlotProps> = ({ movieDetail }) => {
    if (!movieDetail.overview) return null;

    return (
        <div className="bg-gradient-to-br from-slate-50 to-gray-50 rounded-xl p-6 border border-slate-200 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100/50 to-purple-100/50 rounded-full -translate-y-16 translate-x-16"></div>
            
            <div className="relative z-10">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-2 rounded-lg mr-3">
                        <span className="text-white text-xl">📖</span>
                    </div>
                    줄거리
                </h3>
                
                <div className="prose prose-gray max-w-none">
                    <p className="text-gray-700 leading-relaxed text-base lg:text-lg font-medium">
                        {movieDetail.overview}
                    </p>
                </div>
            </div>
        </div>
    );
};