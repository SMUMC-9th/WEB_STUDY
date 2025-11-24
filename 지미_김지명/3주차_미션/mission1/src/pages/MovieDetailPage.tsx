import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
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

// Custom Hooks
import { useMovieDetail } from "../hooks/useMovieDetail";
import { useMovieCredits } from "../hooks/useMovieCredits";
import { useMovieVideos } from "../hooks/useMovieVideos";
import { useSimilarMovies } from "../hooks/useSimilarMovies";

const MovieDetailPage = () => {
    const { movieId } = useParams<{ movieId: string }>();
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    
    // Custom Hooks 사용
    const movieDetail = useMovieDetail(movieId);
    const credits = useMovieCredits(movieId);
    const videos = useMovieVideos(movieId);
    const similarMovies = useSimilarMovies(movieId, page);

    // 전체 로딩 상태
    const isOverallLoading = movieDetail.isLoading;

    // 첫 번째 비디오
    const firstVideo = videos.data?.results[0];

    // 이벤트 핸들러들
    const handleRetry = () => {
        movieDetail.refetch();
        credits.refetch();
        videos.refetch();
        similarMovies.refetch();
    };

    const handleRetryCredits = () => {
        credits.refetch();
    };

    const handleGoHome = () => navigate('/');
    const handleGoBack = () => navigate(-1);

    // movieId 유효성 검사
    if (!movieId) {
        return (
            <MovieDetailError 
                errorStates={{ message: '영화 ID가 제공되지 않았습니다.' }}
                movieId={movieId}
                onRetry={handleRetry}
                onGoHome={handleGoHome}
                onGoBack={handleGoBack}
            />
        );
    }

    if (isNaN(Number(movieId))) {
        return (
            <MovieDetailError 
                errorStates={{ message: '올바르지 않은 영화 ID입니다.' }}
                movieId={movieId}
                onRetry={handleRetry}
                onGoHome={handleGoHome}
                onGoBack={handleGoBack}
            />
        );
    }

    // 로딩 중
    if (isOverallLoading) {
        return (
            <MovieDetailLoader 
                loadingStates={{
                    movieDetail: movieDetail.isLoading,
                    credits: credits.isLoading,
                    overall: isOverallLoading
                }}
                movieTitle={movieDetail.data?.title}
            />
        );
    }

    // 에러 발생
    if (movieDetail.isError) {
        return (
            <MovieDetailError 
                errorStates={{ message: movieDetail.error }}
                movieId={movieId}
                onRetry={handleRetry}
                onGoHome={handleGoHome}
                onGoBack={handleGoBack}
            />
        );
    }

    // 데이터가 없는 경우
    if (!movieDetail.data) {
        return (
            <MovieDetailError 
                errorStates={{ message: '영화 정보를 찾을 수 없습니다.' }}
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
            <MovieHero movieDetail={movieDetail.data} />
            
            {/* 메인 콘텐츠 */}
            <div className="container mx-auto px-4 py-8 relative">
                {/* 제목 (backdrop이 없는 경우) */}
                <MovieTitle movieDetail={movieDetail.data} />
                
                {/* 메인 정보 카드 */}
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 md:p-8 mb-8 border border-white/20">
                    <div className="grid lg:grid-cols-3 gap-8 mb-8">
                        <div>
                            {/* 포스터 */}
                            <div className="lg:col-span-1 flex justify-center">
                                <MoviePoster movieDetail={movieDetail.data} />
                            </div>
                            <YouTube 
                            className="mt-3 flex justify-center pt-3 pb-3" 
                            videoId={firstVideo?.key}
                            opts={{
                                width: '380px',
                                height: '316px',
                            }}
                            />
                        </div>
                        
                        {/* 영화 정보 */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* 제목 (backdrop이 있는 경우) */}
                            <MovieTitle movieDetail={movieDetail.data} showBackdropVersion={true} />
                            
                            {/* 평점 */}
                            <MovieRating movieDetail={movieDetail.data} />
                            
                            {/* 장르 */}
                            <MovieGenres movieDetail={movieDetail.data} />
                            
                            {/* 기본 정보 */}
                            <MovieBasicInfo movieDetail={movieDetail.data} />
                            
                            {/* 박스오피스 */}
                            <MovieBoxOffice movieDetail={movieDetail.data} />
                            
                            {/* 줄거리 */}
                            <MoviePlot movieDetail={movieDetail.data} />
                        </div>
                    </div>
                </div>
                
                {/* 출연진 정보 */}
                <MovieCastCrew 
                    credits={credits.data}
                    onRetryCredits={handleRetryCredits}
                />
                
                {/* 비슷한 영화들 */}
                <p className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 md:p-8 border border-white/20 text-left mt-4 text-xl font-semibold">▶︎ 비슷한 영화들
                <div className="flex w-full flex-wrap gap-6">
                    {similarMovies.data?.results.map((movie)=> {
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