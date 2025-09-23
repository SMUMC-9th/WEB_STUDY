import React from 'react';
import type { Credits } from '../types/movie';
import { getMainCast, getMainCrew } from '../utils/movieUtils';

interface MovieCastCrewProps {
    credits: Credits | null;
    movieId?: string;
    onRetryCredits: () => void;
}

export const MovieCastCrew: React.FC<MovieCastCrewProps> = ({ credits, onRetryCredits }) => {
    if (!credits || !credits.cast || credits.cast.length === 0) {
        return (
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 md:p-8 border border-white/20 text-center">
                <div className="text-6xl mb-4">👥❌</div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">출연진 정보를 불러올 수 없습니다</h3>
                <p className="text-gray-500 mb-6">출연진 정보만 일시적으로 사용할 수 없습니다.</p>
                <button 
                    onClick={onRetryCredits}
                    className="bg-gradient-to-r from-[#dda5e3] to-[#b2dab1] text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all duration-200 font-medium"
                >
                    🔄 출연진 정보 다시 불러오기
                </button>
            </div>
        );
    }

    const mainCast = getMainCast(credits.cast);
    const mainCrew = credits.crew ? getMainCrew(credits.crew) : [];

    return (
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 md:p-8 border border-white/20">
            <div className="flex items-center mb-8">
                <div className="bg-gradient-to-r from-[#dda5e3] to-[#b2dab1] p-3 rounded-full mr-4">
                    <span className="text-white text-2xl">👥</span>
                </div>
                <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800">출연진 & 제작진</h2>
                    <p className="text-gray-600">출연진 {credits.cast.length}명 | 제작진 {credits.crew?.length || 0}명</p>
                </div>
            </div>
            
            {/* 탭 네비게이션 */}
            <div className="flex border-b border-gray-200 mb-8">
                <button className="px-6 py-3 text-[#dda5e3] border-b-2 border-[#dda5e3] font-semibold">
                    주요 출연진
                </button>
            </div>
            
            {/* 주요 출연진 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {mainCast.map((actor, index) => (
                    <div 
                        key={actor.id || index} 
                        className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-4 border border-gray-100 hover:shadow-lg hover:border-[#dda5e3]/30 transition-all duration-300 group"
                    >
                        <div className="text-center">
                            <div className="w-20 h-20 mx-auto mb-3 relative">
                                {actor.profile_path ? (
                                    <img 
                                        src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                                        alt={actor.name}
                                        className="w-full h-full object-cover rounded-full shadow-lg group-hover:scale-110 transition-transform duration-300"
                                        loading="lazy"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gradient-to-br from-[#dda5e3] to-[#b2dab1] rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                                        {actor.name.charAt(0)}
                                    </div>
                                )}
                                
                                {actor.order < 3 && (
                                    <div className="absolute -top-1 -right-1 bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-xs px-2 py-1 rounded-full font-bold shadow-md">
                                        주연
                                    </div>
                                )}
                            </div>
                            
                            <div>
                                <h3 className="font-bold text-gray-800 text-sm leading-tight mb-1 group-hover:text-[#dda5e3] transition-colors duration-200">
                                    {actor.name}
                                </h3>
                                <p className="text-xs text-gray-600 leading-relaxed">
                                    {actor.character}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
                
                {credits.cast.length > 12 && (
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200 flex items-center justify-center group hover:shadow-lg transition-all duration-300">
                        <div className="text-center">
                            <div className="w-20 h-20 mx-auto mb-3 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                <span className="text-white text-2xl">👥</span>
                            </div>
                            <p className="text-sm font-medium text-blue-700 mb-1">
                                외 {credits.cast.length - 12}명
                            </p>
                            <p className="text-xs text-blue-600">더 많은 출연진</p>
                        </div>
                    </div>
                )}
            </div>
            
            {/* 주요 제작진 섹션 */}
            {mainCrew.length > 0 && (
                <div className="mt-12 pt-8 border-t border-gray-200">
                    <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                        <span className="mr-2">🎬</span>
                        주요 제작진
                    </h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {mainCrew.map((person, index) => (
                            <div 
                                key={person.credit_id || index}
                                className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 border border-gray-200 hover:shadow-md hover:border-[#b2dab1]/30 transition-all duration-300"
                            >
                                <div className="flex items-center space-x-3">
                                    <div className="w-12 h-12 bg-gradient-to-br from-[#b2dab1] to-[#dda5e3] rounded-full flex items-center justify-center text-white font-bold text-lg">
                                        {person.name.charAt(0)}
                                    </div>
                                    <div className="flex-1">
                                        <div className="font-semibold text-gray-800 text-sm leading-tight">
                                            {person.name}
                                        </div>
                                        <div className="text-xs text-gray-600 mt-1">
                                            {person.jobs ? person.jobs.join(', ') : person.job}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};