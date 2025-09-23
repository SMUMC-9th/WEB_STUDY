import React from 'react';
import type { MovieDetail } from '../types/movie';

interface MovieBoxOfficeProps {
    movieDetail: MovieDetail;
}

export const MovieBoxOffice: React.FC<MovieBoxOfficeProps> = ({ movieDetail }) => {
    if (movieDetail.budget <= 0 && movieDetail.revenue <= 0) return null;

    return (
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-6 border border-emerald-200">
            <h3 className="text-sm font-semibold text-emerald-700 uppercase tracking-wide mb-4 flex items-center">
                <span className="mr-2">💰</span>
                박스오피스
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {movieDetail.budget > 0 && (
                    <div>
                        <div className="text-sm text-gray-600 mb-1">제작비</div>
                        <div className="text-2xl font-bold text-gray-800">
                            ${movieDetail.budget.toLocaleString()}
                        </div>
                    </div>
                )}
                {movieDetail.revenue > 0 && (
                    <div>
                        <div className="text-sm text-gray-600 mb-1">총 수익</div>
                        <div className="text-2xl font-bold text-gray-800">
                            ${movieDetail.revenue.toLocaleString()}
                        </div>
                        {movieDetail.budget > 0 && (
                            <div className="text-sm text-emerald-600 mt-1">
                                수익률: {((movieDetail.revenue / movieDetail.budget - 1) * 100).toFixed(1)}%
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};