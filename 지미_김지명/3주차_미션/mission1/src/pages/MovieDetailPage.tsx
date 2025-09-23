import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import type { MovieDetail, Credits } from "../types/movie";

// 컴포넌트들 import
import { MovieDetailLoader } from "../components/MovieDetailLoader";
import { MovieDetailError } from "../components/MovieDetailError";
import { BackButton } from "../components/BackButton";
import { MovieHero } from "../components/MovieHero";
import { MovieTitle } from "../components/MovieTitle";
import { MoviePoster } from "../components/MoviePoster";
import { MovieRating } from "../components/MovieRating";
import { MovieGenres } from "../components/MovieGenres";
import { MovieBasicInfo } from "../components/MovieBasicInfo";
import { MovieBoxOffice } from "../components/MovieBoxOffice";
import { MoviePlot } from "../components/MoviePlot";
import { MovieCastCrew } from "../components/MovieCastCrew";

const MovieDetailPage = () => {
    const { movieId } = useParams<{ movieId: string }>();
    const navigate = useNavigate();
    
    // 상태 관리
    const [movieDetail, setMovieDetail] = useState<MovieDetail | null>(null);
    const [credits, setCredits] = useState<Credits | null>(null);
    
    const [loadingStates, setLoadingStates] = useState({
        movieDetail: false,
        credits: false,
        overall: false
    });
    
    const [errorStates, setErrorStates] = useState({
        movieDetail: false,
        credits: false,
        message: ''
    });

    // 상태 초기화
    const resetStates = useCallback(() => {
        setMovieDetail(null);
        setCredits(null);
        setLoadingStates({
            movieDetail: false,
            credits: false,
            overall: false
        });
        setErrorStates({
            movieDetail: false,
            credits: false,
            message: ''
        });
    }, []);

    // 영화 상세 정보 가져오기
    const fetchMovieDetail = async (id: string): Promise<MovieDetail> => {
        setLoadingStates(prev => ({...prev, movieDetail: true, overall: true}));
        
        try {
            const response = await axios.get<MovieDetail>(
                `https://api.themoviedb.org/3/movie/${id}?language=ko-KR`,
                {
                    headers: {
                        'Authorization': `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            return response.data;
        } catch (error: any) {
            let errorMessage = '영화 정보를 불러올 수 없습니다.';
            
            if (error.response?.status === 404) {
                errorMessage = '영화를 찾을 수 없습니다.';
            } else if (error.response?.status === 401) {
                errorMessage = 'API 인증에 실패했습니다.';
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
            const response = await axios.get<Credits>(
                `https://api.themoviedb.org/3/movie/${id}/credits?language=ko-KR`,
                {
                    headers: {
                        'Authorization': `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            return response.data;
        } catch (error) {
            setErrorStates(prev => ({...prev, credits: true, message: '출연진 정보를 불러올 수 없습니다.'}));
            return null;
        } finally {
            setLoadingStates(prev => ({...prev, credits: false}));
        }
    };

    // 메인 데이터 로딩
    const loadMovieData = useCallback(async (id: string) => {
        resetStates();

        try {
            const movieData = await fetchMovieDetail(id);
            setMovieDetail(movieData);
            
            const creditsData = await fetchCredits(id);
            if (creditsData) {
                setCredits(creditsData);
            }
            
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
                message: '영화 ID가 제공되지 않았습니다.'
            });
            return;
        }

        if (isNaN(Number(movieId))) {
            setErrorStates({
                movieDetail: true,
                credits: false,
                message: '올바르지 않은 영화 ID입니다.'
            });
            return;
        }

        loadMovieData(movieId);
    }, [movieId, loadMovieData]);

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
                        {/* 포스터 */}
                        <div className="lg:col-span-1 flex justify-center">
                            <MoviePoster movieDetail={movieDetail} />
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
                    movieId={movieId}
                    onRetryCredits={handleRetryCredits}
                />
            </div>
            
            {/* 하단 여백 */}
            <div className="h-16"></div>
        </div>
    );
};

export default MovieDetailPage;