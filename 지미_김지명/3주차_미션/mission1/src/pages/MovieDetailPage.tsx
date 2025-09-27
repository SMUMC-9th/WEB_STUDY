import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import axios, { AxiosError } from "axios";
import type { MovieDetail, Credits, Movie, MovieResponse, MovieVideoResponse, MovieVideo } from "../types/movie";
import YouTube from 'react-youtube';

// 컴포넌트들 import
import { MovieDetailLoader } from "../components/common/MovieDetailLoader";
import { MovieDetailError } from "../components/moviePage/MovieDetailError";
import { BackButton } from "../components/common/BackButton";
import { MovieHero } from "../components/moviePage/MovieHero";
import { MovieTitle } from "../components/moviePage/MovieTitle";
import { MoviePoster } from "../components/moviePage/MoviePoster";
import { MovieRating } from "../components/moviePage/MovieRating";
import { MovieGenres } from "../components/moviePage/MovieGenres";
import { MovieBasicInfo } from "../components/moviePage/MovieBasicInfo";
import { MovieBoxOffice } from "../components/moviePage/MovieBoxOffice";
import { MoviePlot } from "../components/moviePage/MoviePlot";
import { MovieCastCrew } from "../components/moviePage/MovieCastCrew";
import { SimilarMovie }from "../components/moviePage/SimilarMovie";
import { tmdbApiClient } from "../api/apiClient";
import { tmdbApi } from "../api/tmdb/tmdbApi";

const MovieDetailPage = () => {
    const { movieId } = useParams<{ movieId: string }>();
    const navigate = useNavigate();
    
    // 상태 관리
    const [similarMovies, setSimilarMovies] = useState<Movie[]>([]);
    const [movieDetail, setMovieDetail] = useState<MovieDetail | null>(null);
    const [credits, setCredits] = useState<Credits | null>(null);
    const [movieVideo, setMovieVideo] = useState<MovieVideo | null>(null);
    
    const [page, setPage] = useState(1);

    const [loadingStates, setLoadingStates] = useState({
        movieDetail: false,
        credits: false,
        similarMovies: false,
        movieVideo: false,
        overall: false
    });
    
    const [errorStates, setErrorStates] = useState({
        movieDetail: false,
        credits: false,
        similarMovies: false,
        movieVideo: false,
        message: ''
    });

    // 상태 초기화
    const resetStates = useCallback(() => {
        setMovieDetail(null);
        setCredits(null);
        setSimilarMovies([]);
        setMovieVideo(null);
        setLoadingStates({
            movieDetail: false,
            credits: false,
            similarMovies: false,
            movieVideo: false,
            overall: false
        });
        setErrorStates({
            movieDetail: false,
            credits: false,
            similarMovies: false,
            movieVideo: false,
            message: ''
        });
    }, []);

    // 영화 상세 정보 가져오기
    const fetchMovieDetail = async (id: string): Promise<MovieDetail> => {
        setLoadingStates(prev => ({...prev, movieDetail: true, overall: true}));
        
        try {
            const data = await tmdbApi.getMovieDetail(id);
            return data;
        } catch (error) {
            let errorMessage = '영화 정보를 불러올 수 없습니다.';
            
            if (error instanceof AxiosError) {
                if (error.response?.status === 404) {
                    errorMessage = '영화를 찾을 수 없습니다.';
                } else if (error.response?.status === 401) {
                    errorMessage = 'API 인증에 실패했습니다.';
                }
            }
            
            setErrorStates(prev => ({...prev, movieDetail: true, message: errorMessage}));
            throw new Error(errorMessage);
        } finally {
            setLoadingStates(prev => ({...prev, movieDetail: false}));
        }
    };

    // 크레딧 정보 가져오기
    const fetchCredits = async (id: string): Promise<Credits | null> => {
        setLoadingStates(prev => ({...prev, credits: true}));
        
        try {
            const response = tmdbApi.getCredits(id);
            return response;
        } catch (error) {
            setErrorStates(prev => ({...prev, credits: true, message: '출연진 정보를 불러올 수 없습니다.'}));
            return null;
        } finally {
            setLoadingStates(prev => ({...prev, credits: false}));
        }
    };

    // 비슷한 영화 가져오기
    const fetchSimilarMovies = async(id: string, page: number = 1): Promise<Movie[]> => {
        setLoadingStates(prev => ({...prev, similarMovies: true}));

        try {
            const data = await tmdbApi.getSimilarMovies(id, page);
            return data.results;
        } catch (error) {
            setErrorStates(prev => ({...prev, similarMovies: true, message: '비슷한 영화 정보를 불러올 수 없습니다.'}));
            return [];
        } finally {
            setLoadingStates(prev => ({...prev, similarMovies: false}));
        }
    };

    // 영화 영상 가져오기
    const fetchMovieVideo = async(id: string) => {
        setLoadingStates(prev => ({...prev, movieVideo: true}));

        try {
            const response = await tmdbApi.getMovieVideo(id);
            console.log(response.results[0].key);
            return response.results;
        } catch (error) {
            setErrorStates(prev => ({...prev, movieVideo: true, message: '정보를 불러올 수 없습니다.'}));
            return [];
        } finally {
            setLoadingStates(prev => ({...prev, movieVideo: false}));
        }
    };

    // 메인 데이터 로딩
    const loadMovieData = useCallback(async (id: string) => {
        resetStates();

        try {
            const movieData = await fetchMovieDetail(id);
            setMovieDetail(movieData);
            
            const [creditsData, similarMoviesData, movieVideoData] = await Promise.all([
                fetchCredits(id),
                fetchSimilarMovies(id),
                fetchMovieVideo(id)
            ]);

            if (creditsData) {
                setCredits(creditsData);
            }

            setSimilarMovies(similarMoviesData);
            setMovieVideo(movieVideoData[0]);
            
        } catch (error) {
            console.error('데이터 로딩 실패:', error);
        } finally {
            setLoadingStates(prev => ({...prev, overall: false}));
        }
    }, [resetStates]);

    // useEffect
    useEffect(() => {
        if (!movieId) {
            setErrorStates({
                movieDetail: true,
                credits: false,
                similarMovies: false,
                movieVideo: false,
                message: '영화 ID가 제공되지 않았습니다.'
            });
            return;
        }

        if (isNaN(Number(movieId))) {
            setErrorStates({
                movieDetail: true,
                credits: false,
                similarMovies: false,
                movieVideo: false,
                message: '올바르지 않은 영화 ID입니다.'
            });
            return;
        }

        loadMovieData(movieId);
    }, [movieId, loadMovieData]);

    // page가 변경될 때마다 비슷한 영화 다시 불러오기
    useEffect(() => {
        if (movieId && movieDetail) { // 영화 정보가 이미 로드된 후에만
            fetchSimilarMovies(movieId, page).then(setSimilarMovies);
        }
    }, [page, movieId, movieDetail]);

    // 이벤트 핸들러들
    const handleRetry = () => {
        if (movieId) {
            loadMovieData(movieId);
        }
    };

    const handleRetryCredits = () => {
        if (movieId) {
            fetchCredits(movieId).then(setCredits);
        }
    };

    const handleGoHome = () => navigate('/');
    const handleGoBack = () => navigate(-1);

    // 로딩 중
    if (loadingStates.overall) {
        return (
            <MovieDetailLoader 
                loadingStates={loadingStates}
                movieTitle={movieDetail?.title}
            />
        );
    }

    // 에러 발생
    if (errorStates.movieDetail) {
        return (
            <MovieDetailError 
                errorStates={errorStates}
                movieId={movieId}
                onRetry={handleRetry}
                onGoHome={handleGoHome}
                onGoBack={handleGoBack}
            />
        );
    }

    // 데이터가 없는 경우
    if (!movieDetail) {
        return (
            <MovieDetailError 
                errorStates={{
                    movieDetail: true,
                    credits: false,
                    message: '영화 정보를 찾을 수 없습니다.'
                }}
                movieId={movieId}
                onRetry={handleRetry}
                onGoHome={handleGoHome}
                onGoBack={handleGoBack}
            />
        );
    }

    // 정상 렌더링
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            {/* 뒤로가기 버튼 */}
            <BackButton onGoBack={handleGoBack} />
            
            {/* 히어로 섹션 */}
            <MovieHero movieDetail={movieDetail} />
            
            {/* 메인 콘텐츠 */}
            <div className="container mx-auto px-4 py-8 relative">
                {/* 제목 (backdrop이 없는 경우) */}
                <MovieTitle movieDetail={movieDetail} />
                
                {/* 메인 정보 카드 */}
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 md:p-8 mb-8 border border-white/20">
                    <div className="grid lg:grid-cols-3 gap-8 mb-8">
                        <div>
                            {/* 포스터 */}
                            <div className="lg:col-span-1 flex justify-center">
                                <MoviePoster movieDetail={movieDetail} />
                            </div>
                            <YouTube 
                            className="mt-3 flex justify-center pt-3 pb-3" 
                            videoId={movieVideo?.key}
                            opts={{
                                width: '380px',
                                height: '316px',
                            }}
                            />
                        </div>
                        
                        {/* 영화 정보 */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* 제목 (backdrop이 있는 경우) */}
                            <MovieTitle movieDetail={movieDetail} showBackdropVersion={true} />
                            
                            {/* 평점 */}
                            <MovieRating movieDetail={movieDetail} />
                            
                            {/* 장르 */}
                            <MovieGenres movieDetail={movieDetail} />
                            
                            {/* 기본 정보 */}
                            <MovieBasicInfo movieDetail={movieDetail} />
                            
                            {/* 박스오피스 */}
                            <MovieBoxOffice movieDetail={movieDetail} />
                            
                            {/* 줄거리 */}
                            <MoviePlot movieDetail={movieDetail} />
                        </div>
                    </div>
                </div>
                
                {/* 출연진 정보 */}
                <MovieCastCrew 
                    credits={credits}
                    onRetryCredits={handleRetryCredits}
                />
                
                {/* 비슷한 영화들 */}
                <p className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 md:p-8 border border-white/20 text-left mt-4 text-xl font-semibold">▶︎ 비슷한 영화들
                <div className="flex w-full flex-wrap gap-6">
                    {similarMovies.map((movie)=> {
                        return (
                            <SimilarMovie
                                similarMovie={movie}
                                movieId={movieId}
                            />
                        )
                    })}
                </div>
                <div className="flex items-center justify-center mt-8 gap-4">
                    <button 
                        className='bg-[#dda5e3] text-white px-6 py-3 rounded-lg shadow-md
                        hover:bg-[#b2dab1] transition-all duration-200 disabled:bg-gray-300
                        cursor-pointer disabled:cursor-not-allowed'
                        disabled={page === 1} onClick={() => setPage((prev) => prev-1)}>{`<`}</button>
                        <span>{page} 페이지</span>
                        <button
                        className='bg-[#dda5e3] text-white px-6 py-3 rounded-lg shadow-md
                        hover:bg-[#b2dab1] transition-all duration-200 cursor-pointer'
                        onClick={() => setPage((prev) => prev+1)}>{`>`}
                    </button>
                </div>
                </p>
            </div>
            
            {/* 하단 여백 */}
            <div className="h-16"></div>
        </div>
    );
};

export default MovieDetailPage;