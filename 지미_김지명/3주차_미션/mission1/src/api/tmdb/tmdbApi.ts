import { tmdbApiClient } from '../apiClient';
import type { Credits, MovieDetail, MovieResponse, MovieVideoResponse } from '../../types/movie';

export const tmdbApi = {

    // 카테고리별 영화 조회
    getMoviesByCategory: async (category: string, page: number): Promise<MovieResponse> => {
        const { data } = await tmdbApiClient.get<MovieResponse>(`/movie/${category}`, {
            params: {
                language: 'ko-KR',
                page: page
            }
        });
        return data;
    },

    // 영화 상세 정보 조회
    getMovieDetail: async (movieId: string): Promise<MovieDetail> => {
        const { data } = await tmdbApiClient.get<MovieDetail>(`/movie/${movieId}`, {
            params: {
                language: 'ko-KR'
            }
        });
        return data;
    },

    // 크레딧 정보 조회
    getCredits: async (movieId: string): Promise<Credits> => {
        const { data } = await tmdbApiClient.get<Credits>(`/movie/${movieId}/credits`, {
            params: {
                language: 'ko-KR'
            }
        });
        return data;
    },

    // 비슷한 영화 조회
    getSimilarMovies: async (movieId: string, page: number): Promise<MovieResponse> => {
        const { data } = await tmdbApiClient.get<MovieResponse>(`/movie/${movieId}/similar`, {
            params: {
                language: 'ko-KR',
                page: page
            }
        });
        return data;
    },

    // 영화 영상 조회
    getMovieVideo: async (movieId: string):Promise<MovieVideoResponse> => {
        const { data } = await tmdbApiClient.get<MovieVideoResponse>(`/movie/${movieId}/videos`);
        return data;
    }

}
