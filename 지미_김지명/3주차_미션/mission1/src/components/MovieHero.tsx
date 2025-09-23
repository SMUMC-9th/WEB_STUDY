import React from 'react';
import type { MovieDetail } from '../types/movie';

interface MovieHeroProps {
    movieDetail: MovieDetail;
}

export const MovieHero: React.FC<MovieHeroProps> = ({ movieDetail }) => {
    if (!movieDetail.backdrop_path) return null;

    return (
        <div className="relative h-64 md:h-80 lg:h-96 overflow-hidden">
            <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage: `url(https://image.tmdb.org/t/p/original${movieDetail.backdrop_path})`
                }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
            
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <div className="container mx-auto">
                    <div className="text-white">
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2 drop-shadow-lg">
                            {movieDetail.title}
                        </h1>
                        {movieDetail.original_title !== movieDetail.title && (
                            <h2 className="text-xl md:text-2xl text-gray-200 mb-3 drop-shadow">
                                {movieDetail.original_title}
                            </h2>
                        )}
                        {movieDetail.tagline && (
                            <p className="text-lg md:text-xl italic text-gray-300 drop-shadow">
                                &quot;{movieDetail.tagline}&quot;
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
